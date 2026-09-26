"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { toast } from "@workspace/ui/components/sonner"

const AUTH_TOAST_MESSAGES = {
  login: "로그인했어요. 반가워요!",
  signup: "가입을 완료했어요. 반가워요!",
} as const

type AuthToastKind = keyof typeof AUTH_TOAST_MESSAGES

const isAuthToastKind = (value: string | null): value is AuthToastKind =>
  value === "login" || value === "signup"

export default function AuthToastFromUrl() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const handledKey = useRef<string | null>(null)

  useEffect(() => {
    const authToast = searchParams.get("authToast")
    if (!isAuthToastKind(authToast)) return

    const key = `${pathname}:${searchParams.toString()}`
    if (handledKey.current === key) return
    handledKey.current = key

    toast.success(AUTH_TOAST_MESSAGES[authToast])

    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.delete("authToast")
    const query = nextParams.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }, [pathname, router, searchParams])

  return null
}
