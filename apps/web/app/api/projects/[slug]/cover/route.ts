import { jsonError } from "@/libs/auth/http"
import {
  COVER_MAX_BYTES,
  isCoverMime,
  PROJECT_COVERS_BUCKET,
  toCoverPath,
} from "@/libs/projects/covers"
import { decodeProjectSlug } from "@/libs/projects/slug"
import { createClient } from "@/libs/supabase/server"

type CoverRouteProps = {
  params: Promise<{ slug: string }>
}

export const POST = async (request: Request, { params }: CoverRouteProps) => {
  const { slug: rawSlug } = await params
  const slug = decodeProjectSlug(rawSlug)
  const supabase = await createClient()

  if (!supabase) {
    return jsonError("저장 서버가 아직 연결되지 않았어요.", 503)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return jsonError("로그인이 필요해요.", 401)
  }

  if (slug.includes("/")) {
    return jsonError("카드 주소를 확인해 주세요.", 400)
  }

  const form = await request.formData().catch(() => null)
  const file = form?.get("file")

  if (!(file instanceof File) || file.size === 0) {
    return jsonError("카드 이미지를 선택해 주세요.", 400)
  }

  if (!isCoverMime(file.type)) {
    return jsonError("jpg, png, webp만 올릴 수 있어요.", 400)
  }

  if (file.size > COVER_MAX_BYTES) {
    return jsonError("이미지는 5MB까지 올릴 수 있어요.", 400)
  }

  const { data: owned, error: ownedError } = await supabase
    .from("projects")
    .select("id, cover_path")
    .eq("slug", slug)
    .eq("author_id", user.id)
    .maybeSingle<{ id: string; cover_path: string | null }>()

  if (ownedError || !owned) {
    return jsonError("카드를 찾지 못했어요.", 404)
  }

  const coverPath = toCoverPath(user.id, owned.id, file.type)
  const bytes = new Uint8Array(await file.arrayBuffer())
  const { error: uploadError } = await supabase.storage
    .from(PROJECT_COVERS_BUCKET)
    .upload(coverPath, bytes, {
      contentType: file.type,
      upsert: true,
    })

  if (uploadError) {
    return jsonError("이미지를 올리지 못했어요.", 400)
  }

  if (owned.cover_path && owned.cover_path !== coverPath) {
    await supabase.storage.from(PROJECT_COVERS_BUCKET).remove([owned.cover_path])
  }

  const { error: updateError } = await supabase
    .from("projects")
    .update({ cover_path: coverPath })
    .eq("slug", slug)
    .eq("author_id", user.id)

  if (updateError) {
    return jsonError("이미지 주소를 저장하지 못했어요.", 400)
  }

  return Response.json({ coverPath })
}
