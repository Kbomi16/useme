import type { ReactNode } from "react"
import Link from "next/link"

import type { OAuthProvider } from "@/libs/auth/oauth"

import { authLink } from "./authFormShared"
import OAuthButtons from "./OAuthButtons"

type AuthFormLayoutProps = {
  variant: "login" | "signup"
  children: ReactNode
  isPending: boolean
  nextPath: string
  onOAuth: (provider: OAuthProvider) => void
}

export default function AuthFormLayout({
  variant,
  children,
  isPending,
  nextPath,
  onOAuth,
}: AuthFormLayoutProps) {
  return (
    <div className="flex w-full flex-col gap-6 text-left">
      {children}

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        또는
        <span className="h-px flex-1 bg-border" />
      </div>

      <OAuthButtons disabled={isPending} onSelect={onOAuth} />

      <p className="text-center text-sm break-keep text-muted-foreground">
        {variant === "login" ? (
          <>
            회원이 아니신가요?{" "}
            <Link
              href={authLink("/signup", nextPath)}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              회원가입하기
            </Link>
          </>
        ) : (
          <>
            이미 회원이신가요?{" "}
            <Link
              href={authLink("/login", nextPath)}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              로그인하기
            </Link>
          </>
        )}
      </p>
    </div>
  )
}
