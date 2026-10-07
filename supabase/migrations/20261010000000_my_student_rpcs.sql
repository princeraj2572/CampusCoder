-- Signed-in students manage only their own record, and only through these functions.
-- Authenticated users get no direct insert, update or delete on any table.
revoke insert, update, delete, truncate on all tables in schema public from authenticated;
alter default privileges in schema public revoke insert, update, delete, truncate on tables from authenticated;

create function public.register_my_student(payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  new_id uuid;
begin
  if uid is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;

  insert into students (auth_user_id, full_name, admission_year, section, primary_domain, secondary_domains)
  values (
    uid,
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

create function public.update_my_student(payload jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  sid uuid;
begin
  if uid is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;

  select id into sid from students where auth_user_id = uid;
  if sid is null then
    raise exception 'no student record for this account' using errcode = 'P0002';
  end if;

  if not exists (select 1 from jsonb_array_elements(payload->'accounts') x where x->>'platform' = 'leetcode')
     or not exists (select 1 from jsonb_array_elements(payload->'accounts') x where x->>'platform' = 'github') then
    raise exception 'LeetCode and GitHub usernames are required' using errcode = '22023';
  end if;

  update students set
    full_name = payload->>'full_name',
    admission_year = (payload->>'admission_year')::int,
    section = nullif(payload->>'section', ''),
    primary_domain = (payload->>'primary_domain')::coding_domain,
    secondary_domains = coalesce(
      array(
        select d::coding_domain
        from jsonb_array_elements_text(coalesce(payload->'secondary_domains', '[]'::jsonb)) d
      ),
      '{}'
    ),
    leaderboard_opt_out = coalesce((payload->>'leaderboard_opt_out')::boolean, leaderboard_opt_out)
  where id = sid;

  -- A removed or changed username deletes the platform row, which clears its stats, history
  -- and snapshots; the next refresh fetches the new account. A case-only change keeps the row.
  delete from student_platforms sp
  where sp.student_id = sid
    and not exists (
      select 1 from jsonb_array_elements(payload->'accounts') x
      where x->>'platform' = sp.platform and lower(x->>'username') = lower(sp.username)
    );

  insert into student_platforms (student_id, platform, username)
  select sid, x->>'platform', x->>'username'
  from jsonb_array_elements(payload->'accounts') x
  where not exists (
    select 1 from student_platforms sp where sp.student_id = sid and sp.platform = x->>'platform'
  );
end;
$$;

create function public.delete_my_student()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;
  delete from students where auth_user_id = auth.uid();
end;
$$;

revoke all on function public.register_my_student(jsonb) from public, anon;
revoke all on function public.update_my_student(jsonb) from public, anon;
revoke all on function public.delete_my_student() from public, anon;
grant execute on function public.register_my_student(jsonb) to authenticated;
grant execute on function public.update_my_student(jsonb) to authenticated;
grant execute on function public.delete_my_student() to authenticated;

-- Signed-in users read leaderboards through their own session, so they need the snapshot lookup.
grant execute on function public.snapshots_at(date, int) to authenticated;
