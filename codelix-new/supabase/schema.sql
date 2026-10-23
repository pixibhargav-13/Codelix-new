-- ============================================================
-- Codelix admin panel — Supabase schema
-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE throughout.
-- ============================================================

-- ───────────── BLOG POSTS ─────────────
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,               -- markdown, same format as src/data/blogData.js
  cover_image_url text,
  tags text[] not null default '{}',
  read_time text,                      -- e.g. "5 min read" — kept as free text to match existing data
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_idx on blog_posts (published, published_at desc);

-- ───────────── CASE STUDIES ─────────────
-- full shape, matching every field the richest static entries use (see
-- internal-ops-erp-case-study in caseStudiesData.js) — not just the core
-- fields every entry has, but every optional section the detail page
-- (CaseStudyDetailV2.jsx) conditionally renders when present: snapshot,
-- challenge images, delivery process, results note, services delivered,
-- core features, why-this-stack, future scalability, a named quote, and
-- the "concept, not a live build" flag. All of the optional ones are
-- nullable/empty-default — the public page already skips each section
-- gracefully when its field is absent, so nothing is required beyond the
-- fields every existing case study already has.
create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  category text not null,              -- one of the CaseStudyV2 filter tabs, e.g. "Web Development"
  industry text,                       -- one of the WorkV2 industry-filter options, e.g. "FinTech"
  tags text[] not null default '{}',   -- tech stack, shown as pills
  tools text[] not null default '{}',  -- usually the same list as tags
  overview text[] not null default '{}',
  outcomes jsonb not null default '[]',
  challenges text[] not null default '{}',
  solutions text[] not null default '{}',
  cover_image_url text,
  is_concept boolean not null default false,
  snapshot jsonb not null default '[]',          -- array of { label, value } — "Engagement at a Glance"
  challenge_image_1_url text,
  challenge_image_1_alt text,
  challenge_image_2_url text,
  challenge_image_2_alt text,
  process jsonb not null default '[]',           -- array of { phase, time, body } — "How We Delivered It"
  results_note text,
  services text[] not null default '{}',         -- "Services Delivered"
  features text[] not null default '{}',         -- "Core Features"
  why_stack text[] not null default '{}',
  scalability text[] not null default '{}',
  quote_text text,
  quote_role text,
  quote_name text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists case_studies_published_idx on case_studies (published, published_at desc);

-- safe to re-run against a database where case_studies was already
-- created from an earlier version of this schema (before the columns
-- above existed) — CREATE TABLE IF NOT EXISTS alone wouldn't add them.
alter table case_studies add column if not exists industry text;
alter table case_studies add column if not exists is_concept boolean not null default false;
alter table case_studies add column if not exists snapshot jsonb not null default '[]';
alter table case_studies add column if not exists challenge_image_1_url text;
alter table case_studies add column if not exists challenge_image_1_alt text;
alter table case_studies add column if not exists challenge_image_2_url text;
alter table case_studies add column if not exists challenge_image_2_alt text;
alter table case_studies add column if not exists process jsonb not null default '[]';
alter table case_studies add column if not exists results_note text;
alter table case_studies add column if not exists services text[] not null default '{}';
alter table case_studies add column if not exists features text[] not null default '{}';
alter table case_studies add column if not exists why_stack text[] not null default '{}';
alter table case_studies add column if not exists scalability text[] not null default '{}';
alter table case_studies add column if not exists quote_text text;
alter table case_studies add column if not exists quote_role text;
alter table case_studies add column if not exists quote_name text;
-- the grid card's shorter title, description and tech tags (empty = use the
-- page's own), and the 1200x630 link-preview image (empty = use the cover)
alter table case_studies add column if not exists card_title text;
alter table case_studies add column if not exists card_description text;
alter table case_studies add column if not exists card_tags text[] not null default '{}';
alter table case_studies add column if not exists share_image_url text;

-- ───────────── TESTIMONIALS ─────────────
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,                           -- e.g. "CEO, Harmony Inc."
  quote text not null,
  avatar_url text,
  is_featured boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists testimonials_featured_idx on testimonials (is_featured, sort_order);

-- ───────────── updated_at auto-touch ─────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_posts_set_updated_at on blog_posts;
create trigger blog_posts_set_updated_at
  before update on blog_posts
  for each row execute function set_updated_at();

drop trigger if exists case_studies_set_updated_at on case_studies;
create trigger case_studies_set_updated_at
  before update on case_studies
  for each row execute function set_updated_at();

-- ───────────── Row Level Security ─────────────
alter table blog_posts enable row level security;
alter table case_studies enable row level security;
alter table testimonials enable row level security;

-- public (anon) can only read published rows
drop policy if exists "Public can read published posts" on blog_posts;
create policy "Public can read published posts"
  on blog_posts for select
  to anon
  using (published = true);

drop policy if exists "Public can read published case studies" on case_studies;
create policy "Public can read published case studies"
  on case_studies for select
  to anon
  using (published = true);

drop policy if exists "Public can read testimonials" on testimonials;
create policy "Public can read testimonials"
  on testimonials for select
  to anon
  using (is_featured = true);

-- authenticated (logged-in admin) can do everything
drop policy if exists "Authenticated full access to posts" on blog_posts;
create policy "Authenticated full access to posts"
  on blog_posts for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated full access to case studies" on case_studies;
create policy "Authenticated full access to case studies"
  on case_studies for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated full access to testimonials" on testimonials;
create policy "Authenticated full access to testimonials"
  on testimonials for all
  to authenticated
  using (true)
  with check (true);

-- ───────────── Storage bucket for images ─────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view media" on storage.objects;
create policy "Public can view media"
  on storage.objects for select
  to public
  using (bucket_id = 'media');

drop policy if exists "Authenticated can upload media" on storage.objects;
create policy "Authenticated can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "Authenticated can update media" on storage.objects;
create policy "Authenticated can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

drop policy if exists "Authenticated can delete media" on storage.objects;
create policy "Authenticated can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- ───────────── Seed: migrate the 5 real testimonials already live on the
-- site (Ourwork.jsx / HomepageV2.jsx) so nothing breaks once the public
-- pages switch over to reading from this table. ─────────────
insert into testimonials (name, role, quote, is_featured, sort_order)
values
  ('Rajesh Patel', 'CEO, Harmony Inc.', 'We were able to successfully complete the project by meeting the best partner. They have a very good understanding of development and skills, and are fully committed to the task schedule.', true, 1),
  ('Priya Sharma', 'Founder, Nexa Digital', 'Their communication and problem-solving skills are top-notch. The entire workflow was smooth and professional.', true, 2),
  ('Amit Kumar', 'CTO, PixelWave', 'Amazing team! Delivered everything on time with exceptional quality. Totally recommend!', true, 3),
  ('Emily Watson', 'Director, Nova Corp', 'Honestly, we were struggling to keep up with our growth until they stepped in. They didn''t just build the tech; they actually understood our users. It''s been a total game-changer for our workflow, and the design is just spot on.', true, 4),
  ('Chris Taylor', 'COO, Orbit Labs', 'What I love most is that they don''t just say ''yes'' to everything — they tell us what''s actually going to work. The whole process felt super collaborative, and they genuinely cared about making the project a success.', true, 5)
on conflict do nothing;
