create type public.coding_domain as enum (
  'web_dev','app_dev','ai_ml','data_science','dsa_cp','cybersecurity',
  'cloud_devops','iot_embedded','blockchain','game_dev','other'
);
create type public.student_role as enum ('student', 'admin');

create table public.platforms (
  slug text primary key,
  display_name text not null,
  enabled boolean not null default true
);
insert into public.platforms (slug, display_name) values
  ('leetcode', 'LeetCode'), ('github', 'GitHub'),
  ('codeforces', 'Codeforces'), ('codechef', 'CodeChef');

create table public.students (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users (id) on delete set null,
  full_name text not null check (char_length(full_name) between 2 and 80),
  admission_year int not null check (admission_year between 2000 and 2100),
  section text check (section is null or char_length(section) <= 20),
  primary_domain public.coding_domain not null,
  secondary_domains public.coding_domain[] not null default '{}',
  year_override int check (year_override is null or year_override between 1 and 4),
  role public.student_role not null default 'student',
  leaderboard_opt_out boolean not null default false,
  is_alumni boolean not null default false,
  created_at timestamptz not null default now(),
  constraint secondary_domains_max_two check (cardinality(secondary_domains) <= 2),
  constraint secondary_not_primary check (not (primary_domain = any (secondary_domains)))
);

create table public.student_platforms (
  student_id uuid not null references public.students (id) on delete cascade,
  platform text not null references public.platforms (slug),
  username text not null check (char_length(username) between 1 and 40),
  username_key text generated always as (lower(username)) stored,
  verified boolean not null default false,
  last_updated timestamptz,
  primary key (student_id, platform),
  constraint student_platforms_platform_username_uq unique (platform, username_key)
);

create table public.platform_stats (
  student_id uuid not null,
  platform text not null,
  rating int,
  solved int,
  rank int,
  contests int,
  extra jsonb not null default '{}',
  last_updated timestamptz not null default now(),
  primary key (student_id, platform),
  foreign key (student_id, platform)
    references public.student_platforms (student_id, platform) on delete cascade
);

create table public.contest_history (
  id bigserial primary key,
  student_id uuid not null,
  platform text not null,
  contest_id text not null,
  contest_name text,
  contest_date timestamptz,
  rank int,
  rating_after int,
  rating_change int,
  unique (student_id, platform, contest_id),
  foreign key (student_id, platform)
    references public.student_platforms (student_id, platform) on delete cascade
);

create table public.daily_snapshots (
  student_id uuid not null,
  platform text not null,
  snapshot_date date not null,
  rating int,
  solved int,
  rank int,
  contests int,
  extra jsonb not null default '{}',
  primary key (student_id, platform, snapshot_date),
  foreign key (student_id, platform)
    references public.student_platforms (student_id, platform) on delete cascade
);

create table public.badges (
  student_id uuid not null references public.students (id) on delete cascade,
  badge text not null,
  awarded_at timestamptz not null default now(),
  primary key (student_id, badge)
);

create table public.settings (
  key text primary key,
  value jsonb not null
);
insert into public.settings (key, value) values
  ('score_weights', '{"leetcode_vs_other": [0.7, 0.3], "difficulty": {"easy": 1, "medium": 3, "hard": 5}}');

-- Row Level Security: on for every table; read for signed-in users only.
alter table public.platforms enable row level security;
alter table public.students enable row level security;
alter table public.student_platforms enable row level security;
alter table public.platform_stats enable row level security;
alter table public.contest_history enable row level security;
alter table public.daily_snapshots enable row level security;
alter table public.badges enable row level security;
alter table public.settings enable row level security;

create policy "signed-in read" on public.platforms for select to authenticated using (true);
create policy "signed-in read" on public.students for select to authenticated using (true);
create policy "signed-in read" on public.student_platforms for select to authenticated using (true);
create policy "signed-in read" on public.platform_stats for select to authenticated using (true);
create policy "signed-in read" on public.contest_history for select to authenticated using (true);
create policy "signed-in read" on public.daily_snapshots for select to authenticated using (true);
create policy "signed-in read" on public.badges for select to authenticated using (true);
create policy "signed-in read" on public.settings for select to authenticated using (true);

-- Defense in depth: anon gets no table privileges at all.
revoke all on all tables in schema public from anon;
alter default privileges in schema public revoke all on tables from anon;

-- Atomic registration. Only the service role may call it.
create function public.register_student(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  insert into students (full_name, admission_year, section, primary_domain, secondary_domains)
  values (
    payload->>'full_name',
    (payload->>'admission_year')::int,
    nullif(payload->>'section', ''),
    (payload->>'primary_domain')::coding_domain,
    coalesce(
      array(
        select d::coding_domain
        from jsonb_array_elements_text(coalesce(payload->'secondary_domains', '[]'::jsonb)) d
      ),
      '{}'
    )
  )
  returning id into new_id;

  insert into student_platforms (student_id, platform, username)
  select new_id, a->>'platform', a->>'username'
  from jsonb_array_elements(payload->'accounts') a;

  return new_id;
end;
$$;

revoke all on function public.register_student(jsonb) from public, anon, authenticated;
grant execute on function public.register_student(jsonb) to service_role;

-- Fail the migration if any public table lacks RLS.
do $$
declare t text;
begin
  for t in select tablename from pg_tables where schemaname = 'public' and not rowsecurity loop
    raise exception 'RLS is disabled on public.%', t;
  end loop;
end $$;
