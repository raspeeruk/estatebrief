-- PropertyBrief: Supabase schema
-- Run this in the Supabase SQL editor

-- ────── PROFILES ──────
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  company_name text,
  trial_ends_at timestamptz not null default (now() + interval '7 days'),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text not null default 'none'
    check (subscription_status in ('trialing', 'active', 'canceled', 'past_due', 'none')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, subscription_status)
  values (new.id, new.email, 'none');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ────── BRANDING (Agency plan) ──────
create table if not exists branding (
  user_id uuid primary key references profiles(id) on delete cascade,
  company_name text,
  phone text,
  email text,
  accent_color text not null default '#7C5C3A',
  logo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ────── PORTFOLIOS ──────
create table if not exists portfolios (
  id text primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  owner_name text not null,
  report_date text not null,
  portfolio_data jsonb not null,
  total_properties int not null default 0,
  total_value numeric not null default 0,
  average_gross_yield numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_portfolios_user_id on portfolios(user_id);

-- ────── DEMO SESSIONS (anonymous, 2hr TTL) ──────
create table if not exists demo_sessions (
  id text primary key,
  data jsonb not null,
  type text not null check (type in ('portfolio')),
  expires_at timestamptz not null default (now() + interval '2 hours'),
  created_at timestamptz not null default now()
);

-- ────── ROW LEVEL SECURITY ──────

alter table profiles enable row level security;
alter table branding enable row level security;
alter table portfolios enable row level security;
alter table demo_sessions enable row level security;

-- Profiles: users can only read/update their own
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Branding: users CRUD own
create policy "Users can view own branding"
  on branding for select using (auth.uid() = user_id);
create policy "Users can insert own branding"
  on branding for insert with check (auth.uid() = user_id);
create policy "Users can update own branding"
  on branding for update using (auth.uid() = user_id);
create policy "Users can delete own branding"
  on branding for delete using (auth.uid() = user_id);

-- Portfolios: users CRUD own
create policy "Users can view own portfolios"
  on portfolios for select using (auth.uid() = user_id);
create policy "Users can insert own portfolios"
  on portfolios for insert with check (auth.uid() = user_id);
create policy "Users can update own portfolios"
  on portfolios for update using (auth.uid() = user_id);
create policy "Users can delete own portfolios"
  on portfolios for delete using (auth.uid() = user_id);

-- Demo sessions: anyone can read/insert (anonymous)
create policy "Anyone can read demo sessions"
  on demo_sessions for select using (true);
create policy "Anyone can insert demo sessions"
  on demo_sessions for insert with check (true);
create policy "Anyone can delete expired demo sessions"
  on demo_sessions for delete using (expires_at < now());

-- ────── STORAGE: LOGOS BUCKET ──────
insert into storage.buckets (id, name, public)
values ('logos', 'logos', false)
on conflict do nothing;

-- Users can upload to their own folder
create policy "Users can upload own logos"
  on storage.objects for insert
  with check (bucket_id = 'logos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can view own logos"
  on storage.objects for select
  using (bucket_id = 'logos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete own logos"
  on storage.objects for delete
  using (bucket_id = 'logos' and (storage.foldername(name))[1] = auth.uid()::text);
