import { signInSchema, signUpRequestSchema } from "@/libs/auth/schema"

export const jsonError = (message: string, status: number) =>
  Response.json({ message }, { status })

const firstIssueMessage = (
  issues: { message: string }[],
  fallback: string
) => issues[0]?.message ?? fallback

export const parseCredentials = (value: unknown) => {
  const parsed = signInSchema.safeParse(value)

  if (!parsed.success) {
    return {
      ok: false as const,
      message: firstIssueMessage(
        parsed.error.issues,
        "이메일과 비밀번호를 확인해 주세요."
      ),
    }
  }

  return { ok: true as const, data: parsed.data }
}

export const parseSignUpBody = (value: unknown) => {
  const parsed = signUpRequestSchema.safeParse(value)

  if (!parsed.success) {
    return {
      ok: false as const,
      message: firstIssueMessage(
        parsed.error.issues,
        "이름, 이메일, 비밀번호를 확인해 주세요."
      ),
    }
  }

  return { ok: true as const, data: parsed.data }
}
