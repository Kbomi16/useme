"use client"

import { useEffect } from "react"
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
} from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
}

function SyncSystemTheme() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme("system")
  }, [setTheme])

  return null
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SyncSystemTheme />
      {children}
    </NextThemesProvider>
  )
}
