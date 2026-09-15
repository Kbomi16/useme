import Link from "next/link"

import { Badge } from "@workspace/ui/components/badge"

import Logo from "@/components/common/Logo"
import ThemeToggle from "@/components/common/ThemeToggle"

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between gap-4 border-b px-4 py-3">
      <Link
        href="/"
        className="flex items-center gap-2"
        aria-label="useMe Admin 홈"
      >
        <Logo alt="" />
        <Badge variant="secondary">Admin</Badge>
      </Link>
      <ThemeToggle />
    </header>
  )
}
