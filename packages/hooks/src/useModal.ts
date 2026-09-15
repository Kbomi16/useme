"use client"

import type { ReactNode } from "react"
import { create } from "zustand"

export type ModalConfig = {
  title: string
  content: ReactNode
  variant?: "default" | "destructive"
  actionText?: string
  cancelText?: string
}

type ModalRecord = ModalConfig & {
  resolve: (value: boolean) => void
}

type ModalStore = {
  config: ModalRecord | null
  openModal: (config: ModalConfig) => Promise<boolean>
  closeModal: (value: boolean) => void
}

const useModalStore = create<ModalStore>((set, get) => ({
  config: null,
  openModal: (config) =>
    new Promise((resolve) => {
      const current = get().config
      if (current) current.resolve(false)
      set({ config: { ...config, resolve } })
    }),
  closeModal: (value) => {
    const current = get().config
    if (!current) return
    current.resolve(value)
    set({ config: null })
  },
}))

export const useModal = () => {
  const openModal = useModalStore((state) => state.openModal)

  return { openModal }
}

export { useModalStore }
