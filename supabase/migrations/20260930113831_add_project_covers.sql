alter table public.projects
  add column cover_path text;

alter table public.projects
  add constraint projects_cover_path_check
  check (
    cover_path is null
    or cover_path ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[^/]+\.(jpg|png|webp)$'
  );

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-covers',
  'project-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "본인 카드 이미지 등록"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'project-covers'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

create policy "본인 카드 이미지 조회"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'project-covers'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

create policy "본인 카드 이미지 교체"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'project-covers'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  )
  with check (
    bucket_id = 'project-covers'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );

create policy "본인 카드 이미지 삭제"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'project-covers'
    and (storage.foldername(name))[1] = (select auth.uid()::text)
  );
