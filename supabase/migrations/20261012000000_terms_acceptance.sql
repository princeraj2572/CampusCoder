-- Record which version of the terms each student agreed to, and when.
alter table public.students
  add column terms_version text,
  add column terms_accepted_at timestamptz;

create function public.accept_my_terms(version text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'not signed in' using errcode = '28000';
  end if;
  update students
     set terms_version = version, terms_accepted_at = now()
   where auth_user_id = uid;
  if not found then
    raise exception 'not registered' using errcode = 'P0002';
  end if;
end;
$$;

revoke all on function public.accept_my_terms(text) from public, anon;
grant execute on function public.accept_my_terms(text) to authenticated;
