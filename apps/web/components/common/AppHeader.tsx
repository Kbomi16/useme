import Link from "next/link"

import Logo from "@/components/common/Logo"
import ThemeToggle from "@/components/common/ThemeToggle"

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between gap-4 border-b px-4 py-3">
      <Link href="/" aria-label="useMe 홈">
        <Logo alt="" />
      </Link>
      <div className="flex items-center gap-1">
        <Link
          href="/discover"
          className="hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 rounded-lg px-3 py-2 text-sm font-medium outline-none focus-visible:ring-3"
        >
          둘러보기
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
