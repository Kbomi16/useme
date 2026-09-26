import { createClient } from "@/libs/supabase/server"
import { jsonError, parseCredentials } from "@/libs/auth/http"

export const POST = async (request: Request) => {
  const supabase = await createClient()

  if (!supabase) {
    return jsonError("인증 서버가 아직 연결되지 않았어요.", 503)
  }

  const credentials = parseCredentials(await request.json().catch(() => null))

  if (!credentials.ok) {
    return jsonError(credentials.message, 400)
  }

  const { error } = await supabase.auth.signInWithPassword(credentials.data)

  if (error) {
    return jsonError("이메일 또는 비밀번호가 맞지 않아요.", 401)
  }

  return Response.json({ ok: true })
}
