"use client"

import "@uiw/react-md-editor/markdown-editor.css"

import {
  getCommands,
  image,
  type ICommand,
  type TextAreaTextApi,
} from "@uiw/react-md-editor/commands"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react"

import { toast } from "@workspace/ui/components/sonner"
import { cn } from "@workspace/ui/lib/utils"

import {
  COVER_ACCEPT,
  COVER_MAX_BYTES,
  isCoverMime,
} from "@/libs/projects/covers"
import { uploadBodyImage } from "@/libs/projects/uploadBodyImage"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export type ProjectBodyEditorHandle = {
  commitImages: (body: string) => Promise<string>
}

type ProjectBodyEditorProps = {
  value: string
  invalid?: boolean
  describedBy?: string
  commitRef?: { current: ProjectBodyEditorHandle | null }
  onChange: (value: string) => void
}

const allowPreviewUrl = (url: string) =>
  url.startsWith("blob:") ||
  url.startsWith("http://") ||
  url.startsWith("https://") ||
  url.startsWith("/")
    ? url
    : ""

export default function ProjectBodyEditor({
  value,
  invalid,
  describedBy,
  commitRef,
  onChange,
}: ProjectBodyEditorProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const textApiRef = useRef<TextAreaTextApi | null>(null)
  const pendingImagesRef = useRef(new Map<string, File>())
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const editorCommands = useMemo((): ICommand[] => {
    const uploadImageCommand: ICommand = {
      name: "image",
      keyCommand: "image",
      buttonProps: {
        "aria-label": "이미지 올리기",
        title: "이미지 올리기",
      },
      icon: image.icon,
      execute: (_state, api) => {
        textApiRef.current = api
        fileInputRef.current?.click()
      },
    }

    return getCommands().map((command) =>
      command.name === "image" ? uploadImageCommand : command,
    )
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const pendingImages = pendingImagesRef.current

    if (!commitRef) return

    commitRef.current = {
      commitImages: async (body) => {
        let next = body

        for (const [blobUrl, file] of [...pendingImages]) {
          if (!next.includes(blobUrl)) {
            URL.revokeObjectURL(blobUrl)
            pendingImages.delete(blobUrl)
            continue
          }

          const url = await uploadBodyImage(file)
          next = next.split(blobUrl).join(url)
          URL.revokeObjectURL(blobUrl)
          pendingImages.delete(blobUrl)
        }

        onChangeRef.current(next)
        return next
      },
    }

    return () => {
      commitRef.current = null
    }
  }, [commitRef])

  const handleImagePick = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) return

    if (!isCoverMime(file.type)) {
      toast.error("jpg, png, webp만 올릴 수 있어요.")
      return
    }

    if (file.size > COVER_MAX_BYTES) {
      toast.error("이미지는 5MB까지 올릴 수 있어요.")
      return
    }

    const blobUrl = URL.createObjectURL(file)
    pendingImagesRef.current.set(blobUrl, file)
    const markdown = `![](${blobUrl})`
    const api = textApiRef.current

    if (!api) {
      const gap = value.length === 0 || value.endsWith("\n") ? "" : "\n"
      onChange(`${value}${gap}${markdown}`)
      return
    }

    const next = api.replaceSelection(markdown)
    onChange(next.text)
  }

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
      <input
        ref={fileInputRef}
        type="file"
        accept={COVER_ACCEPT}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={handleImagePick}
      />
      {mounted ? (
        <MDEditor
          value={value}
          height={360}
          preview="live"
          commands={editorCommands}
          previewOptions={{ urlTransform: allowPreviewUrl }}
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
