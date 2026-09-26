import { createClient } from "@/libs/supabase/server"
import { jsonError, parseSignUpBody } from "@/libs/auth/http"

export const POST = async (request: Request) => {
  const supabase = await createClient()

  if (!supabase) {
    return jsonError("인증 서버가 아직 연결되지 않았어요.", 503)
  }

  const body = parseSignUpBody(await request.json().catch(() => null))

  if (!body.ok) {
    return jsonError(body.message, 400)
  }

  const { data, error } = await supabase.auth.signUp({
    email: body.data.email,
    password: body.data.password,
    options: {
      data: {
        full_name: body.data.name,
        name: body.data.name,
      },
    },
  })

  if (error) {
    console.error("[auth/sign-up]", error.message, error.code, error.status)

    if (error.code === "over_email_send_rate_limit") {
      return jsonError(
        "인증 메일을 너무 많이 보냈어요. 잠시 후 다시 시도하거나, Confirm email을 끄고 가입해 주세요.",
        429
      )
    }

    return jsonError("이 이메일로는 가입할 수 없어요.", 400)
  }

  return Response.json({
    ok: true,
    needsEmailConfirm: !data.session,
  })
}
