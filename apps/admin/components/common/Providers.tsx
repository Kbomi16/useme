"use client"

import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"

import { createQueryClient } from "@/libs/query/createQueryClient"

type ProvidersProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
