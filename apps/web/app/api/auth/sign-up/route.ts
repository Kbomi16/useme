import { createClient } from "@/libs/supabase/server"
import { jsonError, parseCredentials } from "@/libs/auth/http"

export const POST = async (request: Request) => {
  const supabase = await createClient()

  if (!supabase) {
    return jsonError("인증 서버가 아직 연결되지 않았어요.", 503)
  }

  const credentials = parseCredentials(await request.json().catch(() => null))

  if (!credentials) {
    return jsonError("이메일과 비밀번호 여섯 글자 이상을 넣어 주세요.", 400)
  }

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) {
    return jsonError("이 이메일로는 가입할 수 없어요.", 400)
  }

  return Response.json({
    ok: true,
    needsEmailConfirm: !data.session,
  })
}
