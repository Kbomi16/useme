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
