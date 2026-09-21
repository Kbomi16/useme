import { createClient } from "@/libs/supabase/server"
import type { AuthUser } from "@/libs/auth/types"

export const getAuthUser = async (): Promise<AuthUser | null> => {
  const supabase = await createClient()

  if (!supabase) return null

  const { data } = await supabase.auth.getClaims()
  const claims = data?.claims
  const userId = claims?.sub

  if (!claims || typeof userId !== "string") return null

  const emailClaim = claims.email
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, username")
    .eq("id", userId)
    .maybeSingle<{ display_name: string; username: string }>()

  const displayName =
    profile?.display_name ||
    profile?.username ||
    (typeof emailClaim === "string" ? emailClaim : "나")

  return {
    id: userId,
    email: typeof emailClaim === "string" ? emailClaim : null,
    displayName,
  }
}
