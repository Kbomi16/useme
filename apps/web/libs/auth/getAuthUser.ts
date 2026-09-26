import { createClient } from "@/libs/supabase/server"
import type { AuthUser } from "@/libs/auth/types"

export const getAuthUser = async (): Promise<AuthUser | null> => {
  const supabase = await createClient()

  if (!supabase) return null

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, username")
    .eq("id", user.id)
    .maybeSingle<{ display_name: string; username: string }>()

  const username = profile?.username ?? user.id.slice(0, 8)

  const displayName =
    profile?.display_name ||
    profile?.username ||
    user.email ||
    "나"

  return {
    id: user.id,
    email: user.email ?? null,
    username,
    displayName,
  }
}
