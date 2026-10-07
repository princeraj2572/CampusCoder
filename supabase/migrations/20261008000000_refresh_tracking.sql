-- Track refresh failures so a flaky platform backs off instead of being retried every run.
alter table public.student_platforms
  add column fail_count int not null default 0,
  add column last_error text,
  add column next_attempt_at timestamptz;

create index student_platforms_due_idx
  on public.student_platforms (next_attempt_at, last_updated);
