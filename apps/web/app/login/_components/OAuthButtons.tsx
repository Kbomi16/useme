"use client"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import type { OAuthProvider } from "@/libs/auth/oauth"

type OAuthButtonsProps = {
  disabled?: boolean
  onSelect: (provider: OAuthProvider) => void
}

type OAuthButton = {
  provider: OAuthProvider
  label: string
  className: string
  iconClassName: string
  icon: typeof GoogleLogo
}

const oauthButtons: OAuthButton[] = [
  {
    provider: "google",
    label: "Google로 계속",
    className:
      "bg-white hover:bg-white/90 dark:bg-white dark:hover:bg-white/90",
    iconClassName: "size-10 scale-110",
    icon: GoogleLogo,
  },
  {
    provider: "kakao",
    label: "카카오로 계속",
    className:
      "border-transparent bg-[#FEE500] hover:bg-[#FEE500]/90 dark:bg-[#FEE500] dark:hover:bg-[#FEE500]/90",
    iconClassName: "size-11",
    icon: KakaoLogo,
  },
  {
    provider: "github",
    label: "GitHub로 계속",
    className:
      "border-transparent bg-[#181717] hover:bg-[#181717]/90 dark:bg-[#181717] dark:hover:bg-[#181717]/90 dark:ring-1 dark:ring-white/25",
    iconClassName: "size-11",
    icon: GitHubLogo,
  },
]

export default function OAuthButtons({
  disabled,
  onSelect,
}: OAuthButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {oauthButtons.map((button) => {
        const Icon = button.icon

        return (
          <Button
            key={button.provider}
            type="button"
            variant="outline"
            className={cn(
              "size-16 shrink-0 rounded-full p-0 [&_svg]:pointer-events-none",
              button.className
            )}
            aria-label={button.label}
            disabled={disabled}
            onClick={() => onSelect(button.provider)}
          >
            <Icon className={cn("shrink-0", button.iconClassName)} />
          </Button>
        )
      })}
    </div>
  )
}

type OAuthLogoProps = {
  className?: string
}

function GoogleLogo({ className }: OAuthLogoProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

function KakaoLogo({ className }: OAuthLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#191919"
        d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.707 4.8 4.27 6.054-.188.702-.682 2.545-.78 2.94-.123.49.178.483.376.351.157-.103 2.5-1.703 3.512-2.393.534.074 1.079.12 1.622.12 4.97 0 9-3.186 9-7.116C21 6.185 16.97 3 12 3"
      />
    </svg>
  )
}

function GitHubLogo({ className }: OAuthLogoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#fff"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  )
}
