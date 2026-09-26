import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

import { getSafeNextPath, getSupabaseEnv } from "@/libs/supabase/env"

export const proxy = async (request: NextRequest) => {
  const env = getSupabaseEnv()

  if (!env) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet, headers) => {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options)
        })
        Object.entries(headers).forEach(([key, value]) => {
          supabaseResponse.headers.set(key, value)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isSignedIn = Boolean(user)
  const { pathname } = request.nextUrl

  const copySupabaseSessionTo = (response: NextResponse) => {
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie)
    })
    ;["cache-control", "expires", "pragma"].forEach((header) => {
      const value = supabaseResponse.headers.get(header)
      if (value) response.headers.set(header, value)
    })
    return response
  }

  const authRequiredPaths = ["/upload", "/me"]
  const guestOnlyPaths = ["/login", "/signup"]

  if (authRequiredPaths.includes(pathname) && !isSignedIn) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/login"
    loginUrl.searchParams.set("next", getSafeNextPath(pathname))
    return copySupabaseSessionTo(NextResponse.redirect(loginUrl))
  }

  if (guestOnlyPaths.includes(pathname) && isSignedIn) {
    const destination = request.nextUrl.clone()
    destination.pathname = getSafeNextPath(
      request.nextUrl.searchParams.get("next"),
      "/discover",
    )
    destination.search = ""
    return copySupabaseSessionTo(NextResponse.redirect(destination))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
