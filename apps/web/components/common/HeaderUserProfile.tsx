import Link from "next/link"

import { cn } from "@workspace/ui/lib/utils"

import type { AuthUser } from "@/libs/auth/types"

type HeaderUserProfileProps = {
  user: AuthUser
}

export default function HeaderUserProfile({ user }: HeaderUserProfileProps) {
  const initial = user.displayName.trim().slice(0, 1) || "?"

  return (
    <Link
      href="/me"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground",
        "ring-2 ring-background transition-colors hover:bg-primary/10 hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
      )}
      aria-label={`${user.displayName} 마이페이지`}
    >
      <span aria-hidden>{initial}</span>
    </Link>
  )
}
