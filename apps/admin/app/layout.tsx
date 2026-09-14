import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"

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
  title: "useMe Admin",
  description: "운영 콘솔 골격입니다. 지금은 최소 화면만 있습니다.",
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
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
