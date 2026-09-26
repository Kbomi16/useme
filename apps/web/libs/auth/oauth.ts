export const oauthProviders = ["google", "kakao", "github"] as const

export type OAuthProvider = (typeof oauthProviders)[number]

export const isOAuthProvider = (value: string): value is OAuthProvider =>
  oauthProviders.includes(value as OAuthProvider)
