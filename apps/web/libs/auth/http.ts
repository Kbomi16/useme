export const jsonError = (message: string, status: number) =>
  Response.json({ message }, { status })

export const parseCredentials = (value: unknown) => {
  if (!value || typeof value !== "object") return null

  const email = "email" in value ? value.email : null
  const password = "password" in value ? value.password : null

  if (typeof email !== "string" || typeof password !== "string") return null

  const trimmedEmail = email.trim()
  if (!trimmedEmail || password.length < 6) return null

  return { email: trimmedEmail, password }
}

export const parseSignUpBody = (value: unknown) => {
  const credentials = parseCredentials(value)

  if (!credentials || !value || typeof value !== "object") return null

  const name = "name" in value ? value.name : null

  if (typeof name !== "string") return null

  const trimmedName = name.trim()

  if (!trimmedName) return null

  return { ...credentials, name: trimmedName }
}
