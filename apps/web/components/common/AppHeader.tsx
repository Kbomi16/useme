import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import Logo from "@/components/common/Logo"

export default function AppHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" aria-label="useMe 홈">
          <Logo alt="" />
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/discover"
            className={cn(buttonVariants({ variant: "ghost" }), "h-9")}
          >
            둘러보기
          </Link>
          <Link
            href="/upload"
            className={cn(buttonVariants({ variant: "ghost" }), "h-9")}
          >
            올리기
          </Link>
        </nav>
      </div>
    </header>
  )
}
