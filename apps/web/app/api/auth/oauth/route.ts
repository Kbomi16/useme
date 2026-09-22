import { NextResponse } from "next/server"

import { isOAuthProvider } from "@/libs/auth/oauth"
import { getSafeNextPath } from "@/libs/supabase/env"
import { createClient } from "@/libs/supabase/server"

export const GET = async (request: Request) => {
  const requestUrl = new URL(request.url)
  const provider = requestUrl.searchParams.get("provider") ?? ""
  const next = getSafeNextPath(requestUrl.searchParams.get("next"))
  const loginUrl = new URL("/login", requestUrl.origin)

  if (!isOAuthProvider(provider)) {
    loginUrl.searchParams.set("error", "지원하지 않는 로그인이에요.")
    return NextResponse.redirect(loginUrl)
  }

  const supabase = await createClient()

  if (!supabase) {
    loginUrl.searchParams.set("error", "인증 서버가 아직 연결되지 않았어요.")
    return NextResponse.redirect(loginUrl)
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${requestUrl.origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  })

  if (error || !data.url) {
    loginUrl.searchParams.set("error", "소셜 로그인을 시작하지 못했어요.")
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.redirect(data.url)
}
