"use client"

import {
  createContext,
  use,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { cn } from "cn"
import { Maximize2Icon, Minimize2Icon, XIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"

const ModalFullscreenContext = createContext(false)

export const useModalFullscreen = () => use(ModalFullscreenContext)

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title: string
  description?: string
  children: ReactNode
  confirmText?: string
  cancelText?: string
  footer?: ReactNode
  width?: string
  height?: string
  className?: string
  isShowFullScreenToggle?: boolean
  isShowFooter?: boolean
  headerActions?: ReactNode
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  children,
  confirmText = "확인",
  cancelText = "취소",
  footer,
  className,
  width = "540px",
  height = "auto",
  isShowFullScreenToggle = true,
  isShowFooter = true,
  headerActions,
}: ModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!isOpen && isFullscreen) {
    setIsFullscreen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const handleToggleFullscreen = () => {
    setIsFullscreen((prev) => !prev)
  }

  const hasFixedHeight = height !== "auto"
  const contentStyle = {
    "--modal-width": isFullscreen ? "100vw" : width,
    ...(hasFixedHeight || isFullscreen
      ? { "--modal-height": isFullscreen ? "100dvh" : height }
      : {}),
  } as CSSProperties

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        style={contentStyle}
        {...(!description ? { "aria-describedby": undefined } : {})}
        className={cn(
          "bg-background inset-0 top-0 left-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden border-none p-0 shadow-lg",
          isFullscreen
            ? "sm:top-0 sm:left-0 sm:h-dvh sm:max-h-none sm:w-screen sm:max-w-none sm:translate-x-0 sm:translate-y-0 sm:rounded-none"
            : "sm:top-1/2 sm:left-1/2 sm:max-h-[85vh] sm:w-full sm:max-w-(--modal-width) sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl",
          hasFixedHeight || isFullscreen ? "sm:h-(--modal-height)" : "sm:h-auto",
          className
        )}
      >
        <ModalFullscreenContext value={isFullscreen}>
          <DialogHeader className="shrink-0 bg-transparent p-6 pb-2 text-left">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <DialogTitle className="text-xl leading-snug font-bold tracking-tight break-keep">
                  {title}
                </DialogTitle>
                {description ? (
                  <DialogDescription className="text-sm leading-relaxed font-medium break-keep">
                    {description}
                  </DialogDescription>
                ) : null}
              </div>

              <div className="text-muted-foreground flex shrink-0 items-center gap-0.5">
                {headerActions}
                {isShowFullScreenToggle ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-lg"
                    onClick={handleToggleFullscreen}
                    aria-label={isFullscreen ? "전체 화면 닫기" : "전체 화면"}
                    aria-pressed={isFullscreen}
                  >
                    {isFullscreen ? <Minimize2Icon /> : <Maximize2Icon />}
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  onClick={onClose}
                  aria-label="닫기"
                >
                  <XIcon />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            {children}
          </div>

          {isShowFooter ? (
            <div className="shrink-0 bg-transparent p-6">
              {footer ? (
                footer
              ) : (
                <ModalDefaultFooter
                  cancelText={cancelText}
                  confirmText={confirmText}
                  onClose={onClose}
                  onConfirm={onConfirm}
                />
              )}
            </div>
          ) : null}
        </ModalFullscreenContext>
      </DialogContent>
    </Dialog>
  )
}

function ModalDefaultFooter({
  cancelText,
  confirmText,
  onClose,
  onConfirm,
}: {
  cancelText: string
  confirmText: string
  onClose: () => void
  onConfirm?: () => void
}) {
  return (
    <div className="flex w-full items-center justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        className="h-11 rounded-xl px-5 font-semibold"
        onClick={onClose}
      >
        {cancelText}
      </Button>
      {onConfirm ? (
        <Button
          type="button"
          className="h-11 rounded-xl px-5 font-bold shadow-none"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      ) : null}
    </div>
  )
}
