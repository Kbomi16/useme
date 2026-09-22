create schema if not exists private;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  display_name text not null,
  avatar_path text,
  bio text,
  credit_balance integer not null default 0 check (credit_balance >= 0),
  credit_earned_total integer not null default 0,
  tier text not null default 'Rookie',
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_username_idx on public.profiles (username);

alter table public.profiles enable row level security;

create policy "본인 프로필 읽기"
  on public.profiles
  for select
  to authenticated
  using (id = (select auth.uid()));

create policy "본인 프로필 수정"
  on public.profiles
  for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $handle_new_user$
declare
  meta_name text;
  base_username text;
  final_username text;
  suffix integer := 0;
begin
  meta_name := coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    split_part(coalesce(new.email, 'user'), '@', 1),
    'user'
  );

  base_username := left(
    regexp_replace(lower(meta_name), '[^a-z0-9]+', '_', 'g'),
    24
  );
  base_username := trim(both '_' from base_username);

  if base_username is null or base_username = '' then
    base_username := 'user_' || substr(replace(new.id::text, chr(45), ''), 1, 8);
  end if;

  final_username := base_username;

  while exists (
    select 1
    from public.profiles
    where username = final_username
  ) loop
    suffix := suffix + 1;
    final_username := left(base_username, 20) || suffix::text;
  end loop;

  insert into public.profiles (id, username, display_name)
  values (new.id, final_username, meta_name);

  return new;
end;
$handle_new_user$;

revoke all on function private.handle_new_user() from public;
grant usage on schema private to supabase_auth_admin;
grant execute on function private.handle_new_user() to supabase_auth_admin;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function private.handle_new_user();
