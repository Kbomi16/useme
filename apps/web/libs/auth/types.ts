export type AuthMode = "login" | "signup"

export type SignUpResponse = {
  ok: true
  needsEmailConfirm: boolean
}

export type AuthUser = {
  id: string
  email: string | null
  displayName: string
}
