import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import HeaderUserProfile from "@/components/common/HeaderUserProfile"
import type { AuthUser } from "@/libs/auth/types"

type AppHeaderAuthProps = {
  user: AuthUser | null
}

export default function AppHeaderAuth({ user }: AppHeaderAuthProps) {
  if (!user) {
    return (
      <Link
        href="/login"
        className={cn(buttonVariants({ variant: "ghost" }), "h-9")}
      >
        로그인/회원가입
      </Link>
    )
  }

  return <HeaderUserProfile user={user} />
}
