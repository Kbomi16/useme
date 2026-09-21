export const getSupabaseEnv = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) return null

  return { url, key }
}

export const getSafeNextPath = (next: string | null | undefined) => {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("://")) {
    return "/"
  }

  return next
}
