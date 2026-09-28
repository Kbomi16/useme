import { createClient } from "@/libs/supabase/server"

export type MyProfile = {
  id: string
  email: string | null
  username: string
  displayName: string
  bio: string | null
  creditBalance: number
  creditEarnedTotal: number
  tier: string
}

export const getMyProfile = async (): Promise<MyProfile | null> => {
  const supabase = await createClient()

  if (!supabase) return null

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "username, display_name, bio, credit_balance, credit_earned_total, tier",
    )
    .eq("id", user.id)
    .maybeSingle<{
      username: string
      display_name: string
      bio: string | null
      credit_balance: number
      credit_earned_total: number
      tier: string
    }>()

  if (!profile) return null

  return {
    id: user.id,
    email: user.email ?? null,
    username: profile.username,
    displayName: profile.display_name,
    bio: profile.bio,
    creditBalance: profile.credit_balance,
    creditEarnedTotal: profile.credit_earned_total,
    tier: profile.tier,
  }
}
