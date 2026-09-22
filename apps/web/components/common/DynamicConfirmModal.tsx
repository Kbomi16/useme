"use client"

import type { ReactElement, ReactNode } from "react"
import { Loader2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { cn } from "@workspace/ui/lib/utils"

type DynamicConfirmModalProps = {
  trigger?: ReactElement
  isOpen: boolean
  onCancel?: () => void
  variant?: "default" | "destructive"
  title: string
  content: string | ReactNode
  actionText?: string
  cancelText?: string
  onConfirm: () => void
  isLoading?: boolean
}

function ConfirmPendingLabel() {
  return (
    <span className="flex items-center justify-center gap-2">
      <Loader2Icon className="size-4 animate-spin" />
      처리 중...
    </span>
  )
}

export default function DynamicConfirmModal({
  trigger,
  isOpen,
  onCancel,
  variant = "default",
  title,
  content,
  actionText = "확인",
  cancelText = "취소",
  onConfirm,
  isLoading = false,
}: DynamicConfirmModalProps) {
  const actionButtonClassName = cn(
    "w-full",
    variant === "destructive" &&
      "bg-destructive text-white hover:bg-destructive/90 hover:text-white focus-visible:border-destructive/40 focus-visible:ring-destructive/20"
  )

  const handleCancel = () => {
    if (isLoading) return
    onCancel?.()
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) handleCancel()
  }

  const handleConfirm = () => {
    if (isLoading) return
    onConfirm()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger ? <AlertDialogTrigger render={trigger} /> : null}

      <AlertDialogContent
        size="sm"
        className="max-w-90 gap-0 rounded-3xl border border-border/60 p-6 shadow-xl ring-0"
      >
        <div className="space-y-5">
          <div className="space-y-2 text-left">
            <AlertDialogTitle className="text-lg/snug font-bold tracking-tight text-foreground">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm/relaxed font-normal whitespace-pre-line text-muted-foreground">
              {content}
            </AlertDialogDescription>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <AlertDialogCancel
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              {cancelText}
            </AlertDialogCancel>

            <AlertDialogAction
              variant={variant === "default" ? "default" : "ghost"}
              onClick={handleConfirm}
              disabled={isLoading}
              className={actionButtonClassName}
            >
              {isLoading ? <ConfirmPendingLabel /> : actionText}
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
