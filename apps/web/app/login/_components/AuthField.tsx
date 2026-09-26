"use client"

import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import type { UseFormRegisterReturn } from "react-hook-form"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"

import { fieldClassName } from "./authFormShared"

type AuthFieldProps = {
  id: string
  label: string
  error?: string
  registration: UseFormRegisterReturn
  type: "text" | "email" | "password"
  autoComplete: string
  placeholder: string
}

export default function AuthField({
  id,
  label,
  error,
  registration,
  type,
  autoComplete,
  placeholder,
}: AuthFieldProps) {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const errorId = `${id}-error`
  const isPassword = type === "password"
  const inputType = isPassword && passwordVisible ? "text" : type

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible((visible) => !visible)
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={inputType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={cn(fieldClassName, isPassword ? "pr-10" : "")}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...registration}
        />
        {isPassword ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground active:-translate-y-1/2"
            aria-label={passwordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
            onClick={handleTogglePasswordVisibility}
          >
            {passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} className="text-sm break-keep text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
