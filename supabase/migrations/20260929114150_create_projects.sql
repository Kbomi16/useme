create table public.projects (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  slug text not null unique,
  name text not null check (char_length(btrim(name)) between 1 and 40),
  tagline text not null check (char_length(btrim(tagline)) between 1 and 80),
  url text not null check (url ~ '^https?://'),
  problem text not null check (char_length(btrim(problem)) between 1 and 200),
  action text not null check (char_length(btrim(action)) between 1 and 200),
  metric text not null check (char_length(btrim(metric)) between 1 and 200),
  body text not null check (char_length(btrim(body)) between 1 and 20000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_author_id_idx on public.projects (author_id);

alter table public.projects enable row level security;

create policy "공개 프로젝트 읽기"
  on public.projects
  for select
  to anon, authenticated
  using (true);

create policy "본인 프로젝트 등록"
  on public.projects
  for insert
  to authenticated
  with check (author_id = (select auth.uid()));

create policy "본인 프로젝트 수정"
  on public.projects
  for update
  to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()));

create or replace function private.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $touch_updated_at$
begin
  new.updated_at = now();
  return new;
end;
$touch_updated_at$;

revoke all on function private.touch_updated_at() from public;

create trigger projects_touch_updated_at
  before update on public.projects
  for each row
  execute function private.touch_updated_at();

grant select on public.projects to anon, authenticated;
grant insert, update on public.projects to authenticated;
