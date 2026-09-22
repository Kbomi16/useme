"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"

import { httpClient } from "@/libs/httpClient"
import type { OAuthProvider } from "@/libs/auth/oauth"
import type { AuthMode, SignUpResponse } from "@/libs/auth/types"

import OAuthButtons from "./OAuthButtons"

type LoginFormProps = {
  mode: AuthMode
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

export default function LoginForm({
  mode,
  nextPath,
  errorMessage,
}: LoginFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
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
    mutationFn: (payload: { name: string; email: string; password: string }) =>
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
    if (password !== passwordConfirm) {
      setNoticeKind("error")
      setNotice("비밀번호 확인이 일치하지 않아요.")
      return
    }

    setNotice("")
    setNoticeKind("info")
    signUpMutation.mutate({
      name: name.trim(),
      email,
      password,
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (mode === "login") {
      handleSignIn()
      return
    }

    handleSignUp()
  }

  const handleOAuth = (provider: OAuthProvider) => {
    const params = new URLSearchParams({
      provider,
      next: nextPath,
    })
    window.location.assign(`/api/auth/oauth?${params.toString()}`)
  }

  const isPending = signInMutation.isPending || signUpMutation.isPending

  const fieldClassName = "h-11 rounded-lg"

  return (
    <div className="flex w-full flex-col gap-6 text-left">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {mode === "signup" ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor="auth-name">이름</Label>
            <Input
              id="auth-name"
              type="text"
              autoComplete="name"
              value={name}
              placeholder="보미"
              className={fieldClassName}
              required
              onChange={(event) => setName(event.currentTarget.value)}
            />
          </div>
        ) : null}
        <div className="flex flex-col gap-2">
          <Label htmlFor="auth-email">이메일</Label>
          <Input
            id="auth-email"
            type="email"
            autoComplete="email"
            value={email}
            placeholder="you@example.com"
            className={fieldClassName}
            required
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="auth-password">비밀번호</Label>
          <Input
            id="auth-password"
            type="password"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            value={password}
            placeholder="여섯 글자 이상"
            className={fieldClassName}
            minLength={6}
            required
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
        {mode === "signup" ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor="auth-password-confirm">비밀번호 확인</Label>
            <Input
              id="auth-password-confirm"
              type="password"
              autoComplete="new-password"
              value={passwordConfirm}
              placeholder="비밀번호를 다시 입력해 주세요"
              className={fieldClassName}
              minLength={6}
              required
              onChange={(event) =>
                setPasswordConfirm(event.currentTarget.value)
              }
            />
          </div>
        ) : null}
        {notice ? (
          <p
            className={cn(
              "text-sm break-keep",
              noticeKind === "error"
                ? "text-destructive"
                : "text-muted-foreground"
            )}
            role="status"
          >
            {notice}
          </p>
        ) : null}
        <Button
          type="submit"
          className={cn("w-full", fieldClassName)}
          disabled={isPending}
        >
          {mode === "login" ? "로그인" : "가입하기"}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        또는
        <span className="h-px flex-1 bg-border" />
      </div>

      <OAuthButtons disabled={isPending} onSelect={handleOAuth} />

      <p className="text-center text-sm break-keep text-muted-foreground">
        {mode === "login" ? (
          <>
            회원이 아니신가요?{" "}
            <Link
              href={
                nextPath === "/"
                  ? "/signup"
                  : `/signup?next=${encodeURIComponent(nextPath)}`
              }
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              회원가입하기
            </Link>
          </>
        ) : (
          <>
            이미 회원이신가요?{" "}
            <Link
              href={
                nextPath === "/"
                  ? "/login"
                  : `/login?next=${encodeURIComponent(nextPath)}`
              }
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              로그인하기
            </Link>
          </>
        )}
      </p>
    </div>
  )
}
