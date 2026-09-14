"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@workspace/ui/components/button"

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const handleToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={handleToggle}
      aria-label="테마 전환"
    >
      <SunIcon className="hidden dark:inline-flex" />
      <MoonIcon className="inline-flex dark:hidden" />
    </Button>
  )
}
