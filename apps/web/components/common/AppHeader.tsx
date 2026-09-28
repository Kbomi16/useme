import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import AppHeaderAuth from "@/components/common/AppHeaderAuth"
import Logo from "@/components/common/Logo"
import { getAuthUser } from "@/libs/auth/getAuthUser"

export default async function AppHeader() {
  const user = await getAuthUser()

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-6 px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            href="/discover"
            aria-label="useMe 둘러보기"
            className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Logo alt="" className="h-9" />
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/discover"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 px-3 font-bold",
              )}
            >
              둘러보기
            </Link>
          </nav>
        </div>
        <nav className="flex shrink-0 items-center">
          <AppHeaderAuth user={user} />
        </nav>
      </div>
    </header>
  )
}
