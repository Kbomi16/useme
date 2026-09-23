"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { Button } from "@workspace/ui/components/button"

import { httpClient } from "@/libs/httpClient"

export default function MyPageSignOut() {
  const router = useRouter()

  // ! [POST] 로그아웃
  const signOutMutation = useMutation({
    mutationFn: () => httpClient.post("/auth/sign-out"),
    onSuccess: () => {
      router.push("/")
      router.refresh()
    },
  })

  const handleSignOut = () => {
    signOutMutation.mutate()
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full sm:w-auto"
      disabled={signOutMutation.isPending}
      onClick={handleSignOut}
    >
      {signOutMutation.isPending ? "로그아웃 중…" : "로그아웃"}
    </Button>
  )
}
