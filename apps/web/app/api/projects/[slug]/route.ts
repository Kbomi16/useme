import { jsonError } from "@/libs/auth/http"
import { decodeProjectSlug } from "@/libs/projects/slug"
import { createClient } from "@/libs/supabase/server"
import { uploadSchema } from "@/app/upload/_components/uploadSchema"

type ProjectRouteProps = {
  params: Promise<{ slug: string }>
}

export const PATCH = async (request: Request, { params }: ProjectRouteProps) => {
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

  const parsed = uploadSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return jsonError(
      parsed.error.issues[0]?.message ?? "입력한 내용을 확인해 주세요.",
      400,
    )
  }

  const { data, error } = await supabase
    .from("projects")
    .update(parsed.data)
    .eq("slug", slug)
    .eq("author_id", user.id)
    .select("slug")
    .maybeSingle<{ slug: string }>()

  if (error || !data) {
    return jsonError("카드를 수정하지 못했어요.", 404)
  }

  return Response.json({ slug: data.slug })
}
