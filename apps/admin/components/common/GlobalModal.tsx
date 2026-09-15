"use client"

import { useModalStore } from "@workspace/hooks/useModal"

import DynamicConfirmModal from "@/components/common/DynamicConfirmModal"

export default function GlobalModal() {
  const config = useModalStore((state) => state.config)
  const closeModal = useModalStore((state) => state.closeModal)

  const handleConfirm = () => {
    closeModal(true)
  }

  const handleCancel = () => {
    closeModal(false)
  }

  if (!config) return null

  return (
    <DynamicConfirmModal
      isOpen
      title={config.title}
      content={config.content}
      variant={config.variant}
      actionText={config.actionText}
      cancelText={config.cancelText}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  )
}
