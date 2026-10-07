-- Latest daily snapshot per student and platform on or before a date, within a window.
-- Used for rank movement, most-improved and trends on the leaderboards.
create function public.snapshots_at(target date, window_days int default 14)
returns table (
  student_id uuid,
  platform text,
  snapshot_date date,
  rating int,
  solved int,
  rank int,
  contests int,
  extra jsonb
)
language sql
stable
security invoker
set search_path = public
as $$
  select distinct on (s.student_id, s.platform)
    s.student_id, s.platform, s.snapshot_date, s.rating, s.solved, s.rank, s.contests, s.extra
  from public.daily_snapshots s
  where s.snapshot_date <= target
    and s.snapshot_date > target - window_days
  order by s.student_id, s.platform, s.snapshot_date desc
$$;

revoke all on function public.snapshots_at(date, int) from public, anon, authenticated;
grant execute on function public.snapshots_at(date, int) to service_role;
