import { jsonError } from "@/libs/auth/http"
import {
  COVER_MAX_BYTES,
  getStoragePublicUrl,
  isCoverMime,
  PROJECT_COVERS_BUCKET,
  toBodyImagePath,
} from "@/libs/projects/covers"
import { createClient } from "@/libs/supabase/server"

export const POST = async (request: Request) => {
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

  const form = await request.formData().catch(() => null)
  const file = form?.get("file")

  if (!(file instanceof File) || file.size === 0) {
    return jsonError("이미지를 선택해 주세요.", 400)
  }

  if (!isCoverMime(file.type)) {
    return jsonError("jpg, png, webp만 올릴 수 있어요.", 400)
  }

  if (file.size > COVER_MAX_BYTES) {
    return jsonError("이미지는 5MB까지 올릴 수 있어요.", 400)
  }

  const objectPath = toBodyImagePath(user.id, crypto.randomUUID(), file.type)
  const bytes = new Uint8Array(await file.arrayBuffer())
  const { error } = await supabase.storage
    .from(PROJECT_COVERS_BUCKET)
    .upload(objectPath, bytes, { contentType: file.type })

  if (error) {
    return jsonError("이미지를 올리지 못했어요.", 400)
  }

  const url = getStoragePublicUrl(PROJECT_COVERS_BUCKET, objectPath)

  if (!url) {
    return jsonError("이미지 주소를 만들지 못했어요.", 500)
  }

  return Response.json({ url })
}
