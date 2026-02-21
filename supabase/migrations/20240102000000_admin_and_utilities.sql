-- CV Builder Admin & Utility Functions
-- Requires initial_schema migration

-- ============================================================================
-- ADMIN FUNCTIONS
-- For owner dashboard to manage pricing and view analytics
-- ============================================================================

-- Function to check if user is admin
-- Note: You'll need to manually add admins to the auth.users metadata
-- or create an admin_users table
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
as $$
  select exists (
    select 1 from auth.users 
    where id = (select auth.uid())
    and raw_user_meta_data->>'role' = 'admin'
  );
$$;

-- Function to update pricing tier (admin only)
create or replace function public.update_pricing_tier(
  p_tier_id bigint,
  p_price_sar integer default null,
  p_name_en text default null,
  p_name_ar text default null,
  p_description_en text default null,
  p_description_ar text default null,
  p_features_en text[] default null,
  p_features_ar text[] default null,
  p_is_popular boolean default null,
  p_max_resumes integer default null,
  p_has_ai_writing boolean default null,
  p_has_cover_letter boolean default null,
  p_has_linkedin_optimization boolean default null,
  p_has_cv_review boolean default null,
  p_has_priority_support boolean default null,
  p_is_active boolean default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'Unauthorized: Admin access required';
  end if;
  
  update public.pricing_tiers
  set 
    price_sar = coalesce(p_price_sar, price_sar),
    name_en = coalesce(p_name_en, name_en),
    name_ar = coalesce(p_name_ar, name_ar),
    description_en = coalesce(p_description_en, description_en),
    description_ar = coalesce(p_description_ar, description_ar),
    features_en = coalesce(p_features_en, features_en),
    features_ar = coalesce(p_features_ar, features_ar),
    is_popular = coalesce(p_is_popular, is_popular),
    max_resumes = coalesce(p_max_resumes, max_resumes),
    has_ai_writing = coalesce(p_has_ai_writing, has_ai_writing),
    has_cover_letter = coalesce(p_has_cover_letter, has_cover_letter),
    has_linkedin_optimization = coalesce(p_has_linkedin_optimization, has_linkedin_optimization),
    has_cv_review = coalesce(p_has_cv_review, has_cv_review),
    has_priority_support = coalesce(p_has_priority_support, has_priority_support),
    is_active = coalesce(p_is_active, is_active),
    updated_at = now()
  where id = p_tier_id;
end;
$$;

-- Function to get dashboard analytics (admin only)
create or replace function public.get_admin_analytics(
  p_start_date timestamptz default now() - interval '30 days',
  p_end_date timestamptz default now()
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  result jsonb;
begin
  if not public.is_admin() then
    raise exception 'Unauthorized: Admin access required';
  end if;
  
  select jsonb_build_object(
    'total_users', (select count(*) from auth.users),
    'active_subscriptions', (select count(*) from public.subscriptions where status = 'active'),
    'total_resumes', (select count(*) from public.resumes),
    'total_exports', (select sum(export_count) from public.resumes),
    'subscriptions_by_tier', (
      select jsonb_agg(jsonb_build_object(
        'tier', pt.key,
        'count', count(s.id),
        'revenue', sum(pt.price_sar)
      ))
      from public.subscriptions s
      join public.pricing_tiers pt on pt.id = s.tier_id
      where s.status = 'active'
      group by pt.key
    ),
    'new_users_period', (
      select count(*) from auth.users 
      where created_at between p_start_date and p_end_date
    ),
    'new_subscriptions_period', (
      select count(*) from public.subscriptions 
      where purchased_at between p_start_date and p_end_date
    ),
    'revenue_period', (
      select coalesce(sum(pt.price_sar), 0)
      from public.subscriptions s
      join public.pricing_tiers pt on pt.id = s.tier_id
      where s.purchased_at between p_start_date and p_end_date
    )
  into result;
  
  return result;
end;
$$;

-- ============================================================================
-- USER HELPER FUNCTIONS
-- ============================================================================

-- Function to get user's current subscription limits
create or replace function public.get_user_limits()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  result jsonb;
begin
  select jsonb_build_object(
    'tier', coalesce(pt.key, 'free'),
    'tier_name_en', coalesce(pt.name_en, 'Free'),
    'tier_name_ar', coalesce(pt.name_ar, 'مجاني'),
    'max_resumes', coalesce(pt.max_resumes, 1),
    'current_resumes', (
      select count(*) from public.resumes 
      where user_id = (select auth.uid()) and is_archived = false
    ),
    'has_ai_writing', coalesce(pt.has_ai_writing, false),
    'has_cover_letter', coalesce(pt.has_cover_letter, false),
    'has_linkedin_optimization', coalesce(pt.has_linkedin_optimization, false),
    'has_cv_review', coalesce(pt.has_cv_review, false),
    'has_priority_support', coalesce(pt.has_priority_support, false)
  ) into result
  from public.subscriptions s
  join public.pricing_tiers pt on pt.id = s.tier_id
  where s.user_id = (select auth.uid())
    and s.status = 'active';
  
  -- Return free tier defaults if no subscription
  if result is null then
    result := jsonb_build_object(
      'tier', 'free',
      'tier_name_en', 'Free',
      'tier_name_ar', 'مجاني',
      'max_resumes', 1,
      'current_resumes', (
        select count(*) from public.resumes 
        where user_id = (select auth.uid()) and is_archived = false
      ),
      'has_ai_writing', false,
      'has_cover_letter', false,
      'has_linkedin_optimization', false,
      'has_cv_review', false,
      'has_priority_support', false
    );
  end if;
  
  return result;
end;
$$;

-- Function to duplicate a resume
create or replace function public.duplicate_resume(
  p_resume_id bigint
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_id bigint;
begin
  -- Verify user owns the resume
  if not exists (
    select 1 from public.resumes 
    where id = p_resume_id and user_id = (select auth.uid())
  ) then
    raise exception 'Unauthorized';
  end if;
  
  -- Check resume limit
  if not public.can_create_resume() then
    raise exception 'Resume limit reached for your subscription tier';
  end if;
  
  -- Duplicate the resume
  insert into public.resumes (
    user_id, title, language_mode, template_key,
    contact, summary, skills, experience, education,
    certifications, projects, languages, awards, volunteering,
    ats_settings
  )
  select 
    user_id, 
    title || ' (Copy)', 
    language_mode, 
    template_key,
    contact, summary, skills, experience, education,
    certifications, projects, languages, awards, volunteering,
    ats_settings
  from public.resumes
  where id = p_resume_id
  returning id into new_id;
  
  return new_id;
end;
$$;

-- Function to check if user can create a new resume
create or replace function public.can_create_resume()
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  max_allowed integer;
  current_count integer;
begin
  -- Get limit from subscription
  select pt.max_resumes into max_allowed
  from public.subscriptions s
  join public.pricing_tiers pt on pt.id = s.tier_id
  where s.user_id = (select auth.uid())
    and s.status = 'active';
  
  -- Default to free tier limit
  if max_allowed is null then
    max_allowed := 1;
  end if;
  
  -- Count current resumes
  select count(*) into current_count
  from public.resumes
  where user_id = (select auth.uid())
    and is_archived = false;
  
  return current_count < max_allowed;
end;
$$;

-- ============================================================================
-- PARTIAL INDEXES FOR BETTER PERFORMANCE
-- ============================================================================

-- Only index active subscriptions (most queries filter by this)
create index subscriptions_active_partial_idx on public.subscriptions (user_id, tier_id)
  where status = 'active';

-- Only index non-archived resumes (most queries filter by this)
create index resumes_active_partial_idx on public.resumes (user_id, updated_at desc)
  where is_archived = false;

-- ============================================================================
-- GRANT EXECUTE ON NEW FUNCTIONS
-- ============================================================================

grant execute on function public.is_admin() to authenticated;
grant execute on function public.update_pricing_tier(
  bigint, integer, text, text, text, text, text[], text[], 
  boolean, integer, boolean, boolean, boolean, boolean, boolean, boolean
) to authenticated;
grant execute on function public.get_admin_analytics(timestamptz, timestamptz) to authenticated;
grant execute on function public.get_user_limits() to authenticated;
grant execute on function public.duplicate_resume(bigint) to authenticated;
grant execute on function public.can_create_resume() to authenticated;
