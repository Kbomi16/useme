import { NextResponse } from "next/server"

import { getSafeNextPath } from "@/libs/supabase/env"
import { createClient } from "@/libs/supabase/server"

export const GET = async (request: Request) => {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = getSafeNextPath(requestUrl.searchParams.get("next"))
  const loginUrl = new URL("/login", requestUrl.origin)

  if (!code) {
    loginUrl.searchParams.set("error", "로그인 코드가 없어요.")
    return NextResponse.redirect(loginUrl)
  }

  const supabase = await createClient()

  if (!supabase) {
    loginUrl.searchParams.set("error", "인증 서버가 아직 연결되지 않았어요.")
    return NextResponse.redirect(loginUrl)
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    loginUrl.searchParams.set("error", "로그인을 끝내지 못했어요.")
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
