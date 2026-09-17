import Link from "next/link"

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
            className="hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 rounded-lg px-3 py-2 text-sm font-medium outline-none focus-visible:ring-3"
          >
            둘러보기
          </Link>
          <Link
            href="/upload"
            className="hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 rounded-lg px-3 py-2 text-sm font-medium outline-none focus-visible:ring-3"
          >
            올리기
          </Link>
        </nav>
      </div>
    </header>
  )
}
