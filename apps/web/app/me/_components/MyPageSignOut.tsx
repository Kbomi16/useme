"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"

import { httpClient } from "@/libs/httpClient"

export default function MyPageSignOut() {
  const router = useRouter()

  // ! [POST] 로그아웃
  const signOutMutation = useMutation({
    mutationFn: () => httpClient.post("/auth/sign-out"),
    onSuccess: () => {
      toast.success("로그아웃했어요.")
      router.push("/login")
      router.refresh()
    },
  })

  const handleSignOut = () => {
    signOutMutation.mutate()
  }

  return (
    <Button
      type="button"
      variant="destructive"
      className="w-full sm:w-auto"
      disabled={signOutMutation.isPending}
      onClick={handleSignOut}
    >
      {signOutMutation.isPending ? "로그아웃 중…" : "로그아웃"}
    </Button>
  )
}
