import { z } from "zod"

const emailField = z
  .string()
  .trim()
  .min(1, "이메일을 입력해 주세요.")
  .email("이메일 형식이 아니에요.")

const signInPasswordField = z
  .string()
  .min(6, "비밀번호는 여섯 글자 이상이어야 해요.")

export const passwordRequirementRules = [
  {
    id: "length",
    label: "여섯 글자 이상",
    test: (password: string) => password.length >= 6,
  },
  {
    id: "letter",
    label: "영문 포함",
    test: (password: string) => /[a-zA-Z]/.test(password),
  },
  {
    id: "number",
    label: "숫자 포함",
    test: (password: string) => /\d/.test(password),
  },
] as const

export const isSignUpPasswordValid = (password: string) =>
  passwordRequirementRules.every((rule) => rule.test(password))

const signUpPasswordField = z
  .string()
  .min(1, "비밀번호를 입력해 주세요.")
  .refine(isSignUpPasswordValid, "비밀번호 조건을 모두 충족해 주세요.")

export const signInSchema = z.object({
  email: emailField,
  password: signInPasswordField,
})

export const signUpRequestSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해 주세요."),
  email: emailField,
  password: signUpPasswordField,
})

export const signUpSchema = signUpRequestSchema

export type SignInValues = z.infer<typeof signInSchema>
export type SignUpValues = z.infer<typeof signUpSchema>
export type SignUpRequest = z.infer<typeof signUpRequestSchema>
