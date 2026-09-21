"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"

import { httpClient } from "@/libs/httpClient"
import type { AuthMode, SignUpResponse } from "@/libs/auth/types"

type LoginFormProps = {
  nextPath: string
  errorMessage?: string
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message
    }
  }

  return fallback
}

export default function LoginForm({ nextPath, errorMessage }: LoginFormProps) {
  const [mode, setMode] = useState<AuthMode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [notice, setNotice] = useState(errorMessage ?? "")
  const [noticeKind, setNoticeKind] = useState<"error" | "info">(
    errorMessage ? "error" : "info"
  )

  const router = useRouter()

  // ! [POST] 로그인
  const signInMutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      httpClient.post("/auth/sign-in", payload),
    onSuccess: () => {
      router.push(nextPath)
      router.refresh()
    },
    onError: (error) => {
      setNoticeKind("error")
      setNotice(getErrorMessage(error, "로그인에 실패했어요."))
    },
  })

  const handleSignIn = () => {
    setNotice("")
    setNoticeKind("info")
    signInMutation.mutate({ email, password })
  }

  // ! [POST] 회원가입
  const signUpMutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      httpClient
        .post<SignUpResponse>("/auth/sign-up", payload)
        .then((response) => response.data),
    onSuccess: (data) => {
      if (data.needsEmailConfirm) {
        setNoticeKind("info")
        setNotice("가입 메일을 보냈어요. 메일함을 확인해 주세요.")
        return
      }

      router.push(nextPath)
      router.refresh()
    },
    onError: (error) => {
      setNoticeKind("error")
      setNotice(getErrorMessage(error, "회원가입에 실패했어요."))
    },
  })

  const handleSignUp = () => {
    setNotice("")
    setNoticeKind("info")
    signUpMutation.mutate({ email, password })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (mode === "login") {
      handleSignIn()
      return
    }

    handleSignUp()
  }

  const handleSelectMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setNotice("")
    setNoticeKind("info")
  }

  const handleOAuth = (provider: "google" | "kakao") => {
    const params = new URLSearchParams({
      provider,
      next: nextPath,
    })
    window.location.assign(`/api/auth/oauth?${params.toString()}`)
  }

  const isPending = signInMutation.isPending || signUpMutation.isPending

  return (
    <div className="flex max-w-md flex-col gap-6">
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        <button
          type="button"
          className={cn(
            "flex-1 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium",
            mode === "login"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => handleSelectMode("login")}
        >
          로그인
        </button>
        <button
          type="button"
          className={cn(
            "flex-1 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium",
            mode === "signup"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => handleSelectMode("signup")}
        >
          회원가입
        </button>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="auth-email">이메일</Label>
          <Input
            id="auth-email"
            type="email"
            autoComplete="email"
            value={email}
            placeholder="you@example.com"
            required
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="auth-password">비밀번호</Label>
          <Input
            id="auth-password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            placeholder="여섯 글자 이상"
            minLength={6}
            required
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
        {notice ? (
          <p
            className={cn(
              "text-sm break-keep",
              noticeKind === "error" ? "text-destructive" : "text-muted-foreground"
            )}
            role="status"
          >
            {notice}
          </p>
        ) : null}
        <Button type="submit" className="w-full rounded-xl" disabled={isPending}>
          {mode === "login" ? "로그인" : "가입하기"}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        또는
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl"
          disabled={isPending}
          onClick={() => handleOAuth("google")}
        >
          Google로 계속
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl"
          disabled={isPending}
          onClick={() => handleOAuth("kakao")}
        >
          카카오로 계속
        </Button>
      </div>
    </div>
  )
}
