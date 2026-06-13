-- LadyF AI: run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).

-- Blog posts published from LF Studio
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text not null,
  published boolean not null default false,
  published_at timestamptz default now(),
  created_at timestamptz not null default now()
);

-- Videos shown on /videos
create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  youtube_id text not null,
  description text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Testimonials shown on the homepage wall
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  highlight text,
  name text not null,
  role text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Brand enquiries from /brands
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  name text not null,
  email text not null,
  product text,
  message text not null,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row level security: the public site reads only published content.
alter table posts enable row level security;
alter table videos enable row level security;
alter table testimonials enable row level security;
alter table enquiries enable row level security;

create policy "public can read published posts"
  on posts for select using (published = true);

create policy "public can read published videos"
  on videos for select using (published = true);

create policy "public can read published testimonials"
  on testimonials for select using (published = true);

create policy "admin can manage testimonials"
  on testimonials for all to authenticated using (true) with check (true);

-- Enquiries: no public access at all. The site writes them with the service key,
-- and only the logged-in admin (authenticated role) can read or update them.
create policy "admin can read enquiries"
  on enquiries for select to authenticated using (true);

create policy "admin can update enquiries"
  on enquiries for update to authenticated using (true);

-- Admin (logged in via /lf-studio) can manage content.
create policy "admin can manage posts"
  on posts for all to authenticated using (true) with check (true);

create policy "admin can manage videos"
  on videos for all to authenticated using (true) with check (true);
