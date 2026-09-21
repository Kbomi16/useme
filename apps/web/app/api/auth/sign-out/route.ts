import { createClient } from "@/libs/supabase/server"
import { jsonError } from "@/libs/auth/http"

export const POST = async () => {
  const supabase = await createClient()

  if (!supabase) {
    return jsonError("인증 서버가 아직 연결되지 않았어요.", 503)
  }

  const { error } = await supabase.auth.signOut()

  if (error) {
    return jsonError("로그아웃에 실패했어요.", 400)
  }

  return Response.json({ ok: true })
}
