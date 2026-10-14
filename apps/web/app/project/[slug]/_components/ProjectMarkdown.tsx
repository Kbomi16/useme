"use client"

import MarkdownPreview from "@uiw/react-markdown-preview"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import "@uiw/react-markdown-preview/markdown.css"

type ProjectMarkdownProps = {
  source: string
}

const allowUrl = (url: string) =>
  url.startsWith("https://") || url.startsWith("http://") || url.startsWith("/")
    ? url
    : ""

export default function ProjectMarkdown({ source }: ProjectMarkdownProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const colorMode = mounted && resolvedTheme === "dark" ? "dark" : "light"

  return (
    <MarkdownPreview
      source={source}
      className="bg-transparent! text-[15px]/relaxed! text-foreground! [&_img]:max-w-full [&_img]:rounded-xl"
      urlTransform={allowUrl}
      wrapperElement={{
        "data-color-mode": colorMode,
      }}
    />
  )
}
