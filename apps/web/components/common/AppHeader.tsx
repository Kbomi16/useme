import Link from "next/link"

import Logo from "@/components/common/Logo"
import AppHeaderAuth from "@/components/common/AppHeaderAuth"
import { getAuthUser } from "@/libs/auth/getAuthUser"

export default async function AppHeader() {
  const user = await getAuthUser()

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" aria-label="useMe 홈">
          <Logo alt="" />
        </Link>
        <nav className="flex items-center gap-1">
          <AppHeaderAuth user={user} />
        </nav>
      </div>
    </header>
  )
}
