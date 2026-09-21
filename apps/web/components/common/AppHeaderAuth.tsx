"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { Button, buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { httpClient } from "@/libs/httpClient"
import type { AuthUser } from "@/libs/auth/types"

type AppHeaderAuthProps = {
  user: AuthUser | null
}

export default function AppHeaderAuth({ user }: AppHeaderAuthProps) {
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

  if (!user) {
    return (
      <Link
        href="/login"
        className={cn(buttonVariants({ variant: "ghost" }), "h-9")}
      >
        로그인/회원가입
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <p className="max-w-32 truncate text-sm font-medium">{user.displayName}</p>
      <Button
        type="button"
        variant="ghost"
        className="h-9"
        disabled={signOutMutation.isPending}
        onClick={handleSignOut}
      >
        로그아웃
      </Button>
    </div>
  )
}
