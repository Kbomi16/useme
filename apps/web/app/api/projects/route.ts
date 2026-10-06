import { jsonError } from "@/libs/auth/http"
import { toProjectSlug } from "@/libs/projects/slug"
import { createClient } from "@/libs/supabase/server"
import { uploadSchema } from "@/app/upload/_components/uploadSchema"

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

  const parsed = uploadSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return jsonError(
      parsed.error.issues[0]?.message ?? "입력한 내용을 확인해 주세요.",
      400,
    )
  }

  const base = toProjectSlug(parsed.data.name)
  let slug: string | null = null

  for (let suffix = 0; suffix < 50; suffix += 1) {
    const candidate = suffix === 0 ? base : `${base.slice(0, 36)}-${suffix}`
    const { data: existing } = await supabase
      .from("projects")
      .select("slug")
      .eq("slug", candidate)
      .maybeSingle()

    if (!existing) {
      slug = candidate
      break
    }
  }

  if (!slug) {
    return jsonError("같은 이름의 카드가 너무 많아요.", 409)
  }

  const { error } = await supabase.from("projects").insert({
    author_id: user.id,
    slug,
    ...parsed.data,
  })

  if (error) {
    return jsonError("카드를 등록하지 못했어요.", 400)
  }

  return Response.json({ slug })
}
