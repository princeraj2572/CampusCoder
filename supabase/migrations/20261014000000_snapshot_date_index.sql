-- The "a week ago" lookup filters daily_snapshots by date alone, which the primary key
-- (student_id, platform, snapshot_date) cannot serve. This keeps it fast as history grows.
create index if not exists daily_snapshots_date_idx
  on public.daily_snapshots (snapshot_date);
