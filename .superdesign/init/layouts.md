# Shared layouts — apps/web

## Root layout

Path: `apps/web/app/layout.tsx`

Renders `html lang="ko"` with Geist + Geist Mono CSS variables, Pretendard via globals. Sticky `AppHeader`, then `children`. Toaster top-center. No footer.

```tsx
import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"

import { Toaster } from "@workspace/ui/components/sonner"

import AppHeader from "@/components/common/AppHeader"
import Providers from "@/components/common/Providers"
import ThemeProvider from "@/components/common/ThemeProvider"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata = {
  title: "useMe",
  description:
    "토이프로젝트를 어필 카드로 바꿔 공유하고, 사람들이 직접 써 보고 피드백하는 플랫폼",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        fontMono.variable,
        geist.variable
      )}
    >
      <body className="bg-background text-foreground min-h-svh">
        <ThemeProvider>
          <Providers>
            <div className="flex min-h-svh flex-col">
              <AppHeader />
              {children}
            </div>
            <Toaster position="top-center" />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## AppHeader

Path: `apps/web/components/common/AppHeader.tsx`

Sticky blurred header, max-w-5xl, logo left, Discover link + theme toggle right.

```tsx
import Link from "next/link"

import Logo from "@/components/common/Logo"
import ThemeToggle from "@/components/common/ThemeToggle"

export default function AppHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-3">
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
      </div>
    </header>
  )
}
```

## Logo

Path: `apps/web/components/common/Logo.tsx`

Light/dark PNG lockups at `/brand/logo-light.png` and `/brand/logo-dark.png`. Height 32px, auto width.

```tsx
import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

type LogoProps = {
  className?: string
  alt?: string
}

export default function Logo({ className, alt = "useMe" }: LogoProps) {
  return (
    <span className={cn("inline-flex h-8", className)}>
      <Image
        src="/brand/logo-light.png"
        alt={alt}
        width={518}
        height={158}
        sizes="164px"
        className="block h-full w-auto dark:hidden"
        fetchPriority="high"
      />
      <Image
        src="/brand/logo-dark.png"
        alt=""
        width={518}
        height={158}
        sizes="164px"
        className="hidden h-full w-auto dark:block"
        fetchPriority="high"
        aria-hidden
      />
    </span>
  )
}
```

## ThemeToggle

Path: `apps/web/components/common/ThemeToggle.tsx`

Ghost icon button; Sun in dark, Moon in light.

No site footer component exists.
