# Supabase Database Migrations

This directory contains SQL migrations for the CV Builder application, following Supabase Postgres best practices.

## Migration Files

| File | Description |
|------|-------------|
| `20240101000000_initial_schema.sql` | Core tables: profiles, pricing_tiers, subscriptions, resumes, cover_letters, analytics |
| `20240102000000_admin_and_utilities.sql` | Admin functions, user helpers, partial indexes |

## Schema Overview

### Tables

```
auth.users (Supabase managed)
    │
    ├── profiles (extended user data)
    │
    ├── subscriptions (one-time purchases)
    │       │
    │       └── pricing_tiers (configurable pricing)
    │
    ├── resumes (main CV data, JSONB for flexibility)
    │       │
    │       ├── resume_analytics (view/export tracking)
    │       └── cover_letters (for pro/premium users)
    │
    └── user_subscription_view (convenient view)
```

### Key Design Decisions

1. **Primary Keys**: Using `bigint generated always as identity` (SQL-standard, sequential)
2. **Data Types**: `text` instead of `varchar`, `timestamptz` for all timestamps, `jsonb` for flexible nested data
3. **Security**: Row-Level Security (RLS) enabled on all user data tables
4. **Performance**: 
   - All foreign keys are indexed
   - Partial indexes for common query patterns
   - Optimized RLS policies using `(select auth.uid())`
5. **Flexibility**: JSONB columns for resume sections (experience, education, etc.) to avoid complex joins and allow easy schema evolution

## How to Apply Migrations

### Option 1: Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### Option 2: Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste each migration file content
4. Execute in order (oldest first)

### Option 3: Local Development

```bash
# Start local Supabase
supabase start

# Apply migrations
supabase db reset

# Generate types for TypeScript
supabase gen types typescript --local > src/types/database.ts
```

## Environment Variables

Add these to your `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Post-Migration Setup

### 1. Set Admin User

To access admin functions, add the admin role to your user:

```sql
-- In Supabase SQL Editor
update auth.users
set raw_user_meta_data = jsonb_set(
  coalesce(raw_user_meta_data, '{}'),
  '{role}',
  '"admin"'
)
where email = 'admin@example.com';
```

### 2. Configure Storage Buckets

In Supabase Dashboard → Storage:
1. Create `avatars` bucket (public)
2. Create `exports` bucket (private, auto-cleanup recommended)

### 3. Configure Auth

In Supabase Dashboard → Authentication:
- Enable Email provider
- Configure email templates (optional)
- Set up Saudi Arabia region settings if needed

## TypeScript Integration

After applying migrations, generate types:

```bash
supabase gen types typescript --project-id your-project-id > src/types/database.ts
```

## Useful Queries

### Get User's Resume Count and Limit

```sql
select * from public.get_user_limits();
```

### Check if User Can Create Resume

```sql
select public.can_create_resume();
```

### Get Admin Analytics

```sql
select * from public.get_admin_analytics(
  now() - interval '30 days',
  now()
);
```

### Update Pricing Tier (Admin)

```sql
select public.update_pricing_tier(
  p_tier_id := 3,  -- Professional tier
  p_price_sar := 129,
  p_name_en := 'Professional',
  p_name_ar := 'احترافي'
);
```

## Best Practices Applied

Based on Supabase Postgres Best Practices:

| Rule | Applied |
|------|---------|
| Use `bigint identity` for PKs | ✅ All tables |
| Index foreign keys | ✅ All FK columns indexed |
| Use `timestamptz` | ✅ All timestamp columns |
| Use `text` over `varchar(n)` | ✅ All string columns |
| Enable RLS on user data | ✅ All user tables |
| Optimize RLS with `(select auth.uid())` | ✅ All RLS policies |
| Partial indexes for common filters | ✅ Active subscriptions/resumes |
