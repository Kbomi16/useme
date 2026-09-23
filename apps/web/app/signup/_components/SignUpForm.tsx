"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm, useWatch } from "react-hook-form"

import { useModal } from "@workspace/hooks/useModal"
import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"
import { cn } from "@workspace/ui/lib/utils"

import AuthField from "@/app/login/_components/AuthField"
import AuthFormLayout from "@/app/login/_components/AuthFormLayout"
import PasswordRequirementList from "@/app/login/_components/PasswordRequirementList"
import {
  fieldClassName,
  getErrorMessage,
} from "@/app/login/_components/authFormShared"
import { httpClient } from "@/libs/httpClient"
import type { OAuthProvider } from "@/libs/auth/oauth"
import { signUpSchema, type SignUpValues } from "@/libs/auth/schema"
import type { SignUpResponse } from "@/libs/auth/types"

type SignUpFormProps = {
  nextPath: string
  errorMessage?: string
}

export default function SignUpForm({
  nextPath,
  errorMessage,
}: SignUpFormProps) {
  const router = useRouter()

  const { openModal } = useModal()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const password = useWatch({ control, name: "password", defaultValue: "" })

  // ! [POST] 회원가입
  const signUpMutation = useMutation({
    mutationFn: (payload: SignUpValues) =>
      httpClient
        .post<SignUpResponse>("/auth/sign-up", {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        })
        .then((response) => response.data),
    onSuccess: (data) => {
      if (data.needsEmailConfirm) {
        toast.info("가입 메일을 보냈어요. 메일함을 확인해 주세요.")
        return
      }

      toast.success("가입을 완료했어요. 반가워요!")
      router.push(nextPath)
      router.refresh()
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "회원가입에 실패했어요."))
    },
  })

  const handleSignUp = handleSubmit(async (values) => {
    const confirmed = await openModal({
      title: "가입할까요?",
      content: (
        <>
          <span className="font-medium text-foreground">{values.email}</span>{" "}
          주소로 계정을 만들게요.
        </>
      ),
      actionText: "가입하기",
      cancelText: "취소",
    })

    if (!confirmed) return

    signUpMutation.mutate(values)
  })

  const handleOAuth = (provider: OAuthProvider) => {
    const params = new URLSearchParams({
      provider,
      next: nextPath,
      intent: "signup",
    })
    window.location.assign(`/api/auth/oauth?${params.toString()}`)
  }

  useEffect(() => {
    if (!errorMessage) return
    toast.error(errorMessage)
  }, [errorMessage])

  return (
    <AuthFormLayout
      variant="signup"
      isPending={signUpMutation.isPending}
      nextPath={nextPath}
      onOAuth={handleOAuth}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSignUp} noValidate>
        <AuthField
          id="auth-name"
          label="이름"
          error={errors.name?.message}
          registration={register("name")}
          type="text"
          autoComplete="name"
          placeholder="김유미"
        />
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
          autoComplete="new-password"
          placeholder="비밀번호를 입력해 주세요"
        />
        <PasswordRequirementList password={password} />
        <Button
          type="submit"
          className={cn("w-full", fieldClassName)}
          disabled={signUpMutation.isPending}
        >
          가입하기
        </Button>
      </form>
    </AuthFormLayout>
  )
}
