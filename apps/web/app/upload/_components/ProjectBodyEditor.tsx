"use client"

import "@uiw/react-md-editor/markdown-editor.css"

import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

type ProjectBodyEditorProps = {
  value: string
  invalid?: boolean
  describedBy?: string
  onChange: (value: string) => void
}

export default function ProjectBodyEditor({
  value,
  invalid,
  describedBy,
  onChange,
}: ProjectBodyEditorProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const colorMode = resolvedTheme === "dark" ? "dark" : "light"

  return (
    <div
      data-color-mode={colorMode}
      className={cn(
        "overflow-hidden rounded-lg border bg-background",
        invalid
          ? "border-destructive ring-3 ring-destructive/20"
          : "border-input",
      )}
    >
      {mounted ? (
        <MDEditor
          value={value}
          height={360}
          preview="live"
          visibleDragbar={false}
          textareaProps={{
            placeholder:
              "마크다운으로 적어 주세요. 툴바에서 이미지를 넣거나, ![](주소) 로 붙일 수 있어요.",
            "aria-label": "프로젝트 설명",
            "aria-invalid": invalid || undefined,
            "aria-describedby": describedBy,
          }}
          onChange={(next) => onChange(next ?? "")}
        />
      ) : (
        <div className="h-[360px]" aria-hidden />
      )}
    </div>
  )
}
