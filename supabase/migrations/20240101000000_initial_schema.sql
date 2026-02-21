-- CV Builder Initial Schema
-- Follows Supabase Postgres Best Practices

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE
-- Extends Supabase auth.users with app-specific data
-- ============================================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  locale text not null default 'en' check (locale in ('en', 'ar')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_email_idx on public.profiles (email);
create index profiles_locale_idx on public.profiles (locale);

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS Policy: Users can only access their own profile
create policy profiles_user_policy on public.profiles
  for all
  to authenticated
  using ((select auth.uid()) = id);

-- Trigger to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

-- Trigger for updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- ============================================================================
-- PRICING TIERS TABLE
-- Stores pricing configuration for the owner dashboard
-- ============================================================================

create table public.pricing_tiers (
  id bigint generated always as identity primary key,
  key text not null unique check (key in ('free', 'basic', 'pro', 'premium')),
  name_en text not null,
  name_ar text not null,
  price_sar integer not null check (price_sar >= 0),
  period_en text not null,
  period_ar text not null,
  description_en text not null,
  description_ar text not null,
  features_en text[] not null default '{}',
  features_ar text[] not null default '{}',
  is_popular boolean not null default false,
  max_resumes integer not null default 1 check (max_resumes >= 1),
  has_ai_writing boolean not null default false,
  has_cover_letter boolean not null default false,
  has_linkedin_optimization boolean not null default false,
  has_cv_review boolean not null default false,
  has_priority_support boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index pricing_tiers_key_idx on public.pricing_tiers (key);
create index pricing_tiers_active_idx on public.pricing_tiers (is_active) where is_active = true;

-- Insert default pricing tiers
insert into public.pricing_tiers (key, name_en, name_ar, price_sar, period_en, period_ar, description_en, description_ar, features_en, features_ar, is_popular, max_resumes, has_ai_writing, has_cover_letter, has_linkedin_optimization, has_cv_review, has_priority_support, sort_order) values
  ('free', 'Free', 'مجاني', 0, 'Forever free', 'مجاني للأبد', 'Perfect for getting started', 'مثالي للبداية', 
   array['1 resume', 'Basic templates', 'PDF export', 'ATS checker'],
   array['سيرة ذاتية واحدة', 'قوالب أساسية', 'تصدير PDF', 'فاحص ATS'],
   false, 1, false, false, false, false, false, 1),
  ('basic', 'Basic', 'أساسي', 49, 'One-time payment', 'دفعة واحدة', 'For job seekers who need more', 'للباحثين عن عمل الذين يحتاجون المزيد',
   array['3 resumes', 'All templates', 'PDF & DOCX export', 'ATS optimization', 'Priority support'],
   array['3 سير ذاتية', 'جميع القوالب', 'تصدير PDF و DOCX', 'تحسين ATS', 'دعم ذو أولوية'],
   false, 3, false, false, false, false, true, 2),
  ('pro', 'Professional', 'احترافي', 99, 'One-time payment', 'دفعة واحدة', 'For serious job seekers', 'للباحثين الجادين عن عمل',
   array['10 resumes', 'All templates', 'PDF & DOCX export', 'AI writing assistant', 'ATS optimization', 'Cover letter builder', 'Priority support'],
   array['10 سير ذاتية', 'جميع القوالب', 'تصدير PDF و DOCX', 'مساعد الكتابة بالذكاء الاصطناعي', 'تحسين ATS', 'منشئ خطاب التغطية', 'دعم ذو أولوية'],
   true, 10, true, true, false, false, true, 3),
  ('premium', 'Premium', 'مميز', 199, 'One-time payment', 'دفعة واحدة', 'For career professionals', 'للمحترفين',
   array['Unlimited resumes', 'All templates', 'PDF & DOCX export', 'AI writing assistant', 'ATS optimization', 'Cover letter builder', 'LinkedIn optimization', '1-on-1 CV review', '24/7 priority support'],
   array['سير ذاتية غير محدودة', 'جميع القوالب', 'تصدير PDF و DOCX', 'مساعد الكتابة بالذكاء الاصطناعي', 'تحسين ATS', 'منشئ خطاب التغطية', 'تحسين ملف LinkedIn', 'مراجعة شخصية للسيرة', 'دعم على مدار الساعة'],
   false, 999999, true, true, true, true, true, 4);

-- ============================================================================
-- SUBSCRIPTIONS TABLE
-- Tracks user purchases (one-time payment model)
-- ============================================================================

create table public.subscriptions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  tier_id bigint not null references public.pricing_tiers(id),
  status text not null default 'active' check (status in ('active', 'expired', 'cancelled', 'refunded')),
  purchased_at timestamptz not null default now(),
  expires_at timestamptz,
  payment_provider text check (payment_provider in ('stripe', 'paypal', 'manual')),
  payment_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  constraint unique_active_subscription unique (user_id) 
    deferrable initially deferred
);

create index subscriptions_user_id_idx on public.subscriptions (user_id);
create index subscriptions_tier_id_idx on public.subscriptions (tier_id);
create index subscriptions_status_idx on public.subscriptions (status) where status = 'active';

alter table public.subscriptions enable row level security;

create policy subscriptions_user_policy on public.subscriptions
  for all
  to authenticated
  using ((select auth.uid()) = user_id);

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row
  execute function public.handle_updated_at();

-- ============================================================================
-- RESUMES TABLE
-- Stores user resumes with JSONB for flexible content
-- ============================================================================

create table public.resumes (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  language_mode text not null default 'EN' check (language_mode in ('AR', 'EN', 'BILINGUAL')),
  template_key text not null default 'classic' check (template_key in ('classic', 'modern-minimal', 'executive')),
  
  -- Contact info stored as JSONB for flexibility
  contact jsonb not null default '{}',
  
  -- Main content
  summary text default '',
  skills text[] default '{}',
  
  -- Sections stored as JSONB arrays
  experience jsonb default '[]',
  education jsonb default '[]',
  certifications jsonb default '[]',
  projects jsonb default '[]',
  languages jsonb default '[]',
  awards jsonb default '[]',
  volunteering jsonb default '[]',
  
  -- ATS settings
  ats_settings jsonb not null default '{"dateFormat": "MMM YYYY", "sectionOrder": ["summary", "skills", "experience", "education", "certifications"], "hideOptionalSections": []}',
  
  -- Metadata
  is_archived boolean not null default false,
  last_exported_at timestamptz,
  export_count integer not null default 0,
  
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for common queries
create index resumes_user_id_idx on public.resumes (user_id);
create index resumes_user_archived_idx on public.resumes (user_id, is_archived) where is_archived = false;
create index resumes_updated_at_idx on public.resumes (updated_at desc);

-- Enable RLS
alter table public.resumes enable row level security;

-- RLS Policy: Users can only access their own resumes
create policy resumes_user_policy on public.resumes
  for all
  to authenticated
  using ((select auth.uid()) = user_id);

-- Trigger for updated_at
create trigger resumes_updated_at
  before update on public.resumes
  for each row
  execute function public.handle_updated_at();

-- Function to check resume limit for user
create or replace function public.check_resume_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  user_tier record;
  current_count integer;
begin
  -- Get user's subscription tier limits
  select pt.max_resumes into user_tier.max_resumes
  from public.subscriptions s
  join public.pricing_tiers pt on pt.id = s.tier_id
  where s.user_id = (select auth.uid())
    and s.status = 'active'
  limit 1;
  
  -- If no subscription, use free tier limit
  if user_tier.max_resumes is null then
    user_tier.max_resumes := 1;
  end if;
  
  -- Count current active resumes
  select count(*) into current_count
  from public.resumes
  where user_id = (select auth.uid())
    and is_archived = false;
  
  -- Check limit on insert
  if tg_op = 'INSERT' and current_count >= user_tier.max_resumes then
    raise exception 'Resume limit reached for your subscription tier';
  end if;
  
  return new;
end;
$$;

-- Trigger to enforce resume limit
create trigger resumes_limit_check
  before insert on public.resumes
  for each row
  execute function public.check_resume_limit();

-- ============================================================================
-- COVER LETTERS TABLE
-- Optional: For pro/premium users
-- ============================================================================

create table public.cover_letters (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  resume_id bigint references public.resumes(id) on delete set null,
  title text not null,
  company_name text,
  job_title text,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index cover_letters_user_id_idx on public.cover_letters (user_id);
create index cover_letters_resume_id_idx on public.cover_letters (resume_id);

alter table public.cover_letters enable row level security;

create policy cover_letters_user_policy on public.cover_letters
  for all
  to authenticated
  using ((select auth.uid()) = user_id);

create trigger cover_letters_updated_at
  before update on public.cover_letters
  for each row
  execute function public.handle_updated_at();

-- ============================================================================
-- ANALYTICS TABLE
-- Track resume views and exports (for future dashboard)
-- ============================================================================

create table public.resume_analytics (
  id bigint generated always as identity primary key,
  resume_id bigint not null references public.resumes(id) on delete cascade,
  event_type text not null check (event_type in ('view', 'export_pdf', 'export_docx', 'share')),
  created_at timestamptz not null default now()
);

create index resume_analytics_resume_id_idx on public.resume_analytics (resume_id);
create index resume_analytics_event_type_idx on public.resume_analytics (event_type);
create index resume_analytics_created_at_idx on public.resume_analytics (created_at desc);

-- Function to record analytics event
create or replace function public.record_resume_event(
  p_resume_id bigint,
  p_event_type text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Verify user owns the resume
  if not exists (
    select 1 from public.resumes 
    where id = p_resume_id and user_id = (select auth.uid())
  ) then
    raise exception 'Unauthorized';
  end if;
  
  insert into public.resume_analytics (resume_id, event_type)
  values (p_resume_id, p_event_type);
  
  -- Update export count and timestamp
  if p_event_type in ('export_pdf', 'export_docx') then
    update public.resumes
    set export_count = export_count + 1,
        last_exported_at = now()
    where id = p_resume_id;
  end if;
end;
$$;

-- ============================================================================
-- HELPER VIEWS
-- ============================================================================

-- View for user subscription info with tier details
create or replace view public.user_subscription_view as
select 
  s.user_id,
  s.id as subscription_id,
  s.status as subscription_status,
  s.purchased_at,
  s.expires_at,
  pt.key as tier_key,
  pt.name_en as tier_name_en,
  pt.name_ar as tier_name_ar,
  pt.max_resumes,
  pt.has_ai_writing,
  pt.has_cover_letter,
  pt.has_linkedin_optimization,
  pt.has_cv_review,
  pt.has_priority_support
from public.subscriptions s
join public.pricing_tiers pt on pt.id = s.tier_id
where s.status = 'active';

-- ============================================================================
-- STORAGE BUCKETS
-- For user avatars and exported files
-- ============================================================================

-- Note: In Supabase, storage buckets are created via dashboard or API
-- This is a placeholder for documentation

-- Buckets needed:
-- 1. avatars - for user profile pictures
-- 2. exports - for generated PDF/DOCX files (temporary storage)

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant access to authenticated users
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.profiles to authenticated;
grant select on public.pricing_tiers to authenticated;
grant select, insert, update, delete on public.subscriptions to authenticated;
grant select, insert, update, delete on public.resumes to authenticated;
grant select, insert, update, delete on public.cover_letters to authenticated;
grant select on public.user_subscription_view to authenticated;

-- Grant execute on functions
grant execute on function public.record_resume_event(bigint, text) to authenticated;
