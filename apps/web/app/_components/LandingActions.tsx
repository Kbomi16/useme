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
          buttonVariants({ size: "lg" }),
          onBrand
            ? "h-12 rounded-2xl bg-white px-6 text-base font-semibold text-primary hover:bg-white/90"
            : "h-12 rounded-2xl px-6 text-base font-semibold"
        )}
      >
        내 프로젝트 올려보기
      </Link>
      <Link
        href="/discover"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          onBrand
            ? "h-12 rounded-2xl border-white/40 bg-transparent px-6 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            : "h-12 rounded-2xl px-6 text-base font-semibold"
        )}
      >
        둘러보기
      </Link>
    </div>
  )
}
