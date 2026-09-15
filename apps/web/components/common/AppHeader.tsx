import Link from "next/link"

import Logo from "@/components/common/Logo"
import ThemeToggle from "@/components/common/ThemeToggle"

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between gap-4 border-b px-4 py-3">
      <Link href="/" aria-label="useMe 홈">
        <Logo alt="" />
      </Link>
      <ThemeToggle />
    </header>
  )
}
