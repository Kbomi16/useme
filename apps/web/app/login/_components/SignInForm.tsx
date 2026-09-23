"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"
import { cn } from "@workspace/ui/lib/utils"

import { httpClient } from "@/libs/httpClient"
import type { OAuthProvider } from "@/libs/auth/oauth"
import { signInSchema, type SignInValues } from "@/libs/auth/schema"

import AuthField from "./AuthField"
import AuthFormLayout from "./AuthFormLayout"
import { fieldClassName, getErrorMessage } from "./authFormShared"

type SignInFormProps = {
  nextPath: string
  errorMessage?: string
}

export default function SignInForm({ nextPath, errorMessage }: SignInFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  })

  // ! [POST] 로그인
  const signInMutation = useMutation({
    mutationFn: (payload: SignInValues) =>
      httpClient.post("/auth/sign-in", payload),
    onSuccess: () => {
      toast.success("로그인했어요. 반가워요!")
      router.push(nextPath)
      router.refresh()
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "로그인에 실패했어요."))
    },
  })

  const handleSignIn = handleSubmit((values) => {
    signInMutation.mutate(values)
  })

  const handleOAuth = (provider: OAuthProvider) => {
    const params = new URLSearchParams({
      provider,
      next: nextPath,
      intent: "login",
    })
    window.location.assign(`/api/auth/oauth?${params.toString()}`)
  }

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  return (
    <AuthFormLayout
      variant="login"
      isPending={signInMutation.isPending}
      nextPath={nextPath}
      onOAuth={handleOAuth}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSignIn} noValidate>
        <AuthField
          id="auth-email"
          label="이메일"
          error={errors.email?.message}
          registration={register("email")}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <AuthField
          id="auth-password"
          label="비밀번호"
          error={errors.password?.message}
          registration={register("password")}
          type="password"
          autoComplete="current-password"
          placeholder="여섯 글자 이상"
        />
        <Button
          type="submit"
          className={cn("w-full", fieldClassName)}
          disabled={signInMutation.isPending}
        >
          로그인
        </Button>
      </form>
    </AuthFormLayout>
  )
}
