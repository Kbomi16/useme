import { CheckIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

import { passwordRequirementRules } from "@/libs/auth/schema"

type PasswordRequirementListProps = {
  password: string
}

export default function PasswordRequirementList({
  password,
}: PasswordRequirementListProps) {
  return (
    <ul
      className="flex flex-col gap-1.5"
      aria-label="비밀번호 조건"
      aria-live="polite"
    >
      {passwordRequirementRules.map((rule) => {
        const met = rule.test(password)

        return (
          <li
            key={rule.id}
            className={cn(
              "flex items-center gap-2 text-sm break-keep",
              met ? "text-primary" : "text-muted-foreground"
            )}
          >
            <CheckIcon
              className={cn(
                "size-4 shrink-0 transition-colors",
                met ? "text-primary" : "text-muted-foreground/45"
              )}
              aria-hidden
            />
            {rule.label}
          </li>
        )
      })}
    </ul>
  )
}
