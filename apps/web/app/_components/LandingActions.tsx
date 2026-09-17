import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

type LandingActionsProps = {
  tone?: "default" | "onBrand"
  className?: string
}

export default function LandingActions({
  tone = "default",
  className,
}: LandingActionsProps) {
  const onBrand = tone === "onBrand"

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:gap-3",
        className
      )}
    >
      <Link
        href="/upload"
        className={cn(
          buttonVariants(),
          onBrand && "bg-white text-primary hover:bg-white/90"
        )}
      >
        내 프로젝트 올려보기
      </Link>
      <Link
        href="/discover"
        className={cn(
          buttonVariants({ variant: "outline" }),
          onBrand &&
            "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
        )}
      >
        둘러보기
      </Link>
    </div>
  )
}
