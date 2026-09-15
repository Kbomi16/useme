"use client"

import Link from "next/link"

import { Button, buttonVariants } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"
import { cn } from "@workspace/ui/lib/utils"

type LandingActionsProps = {
  tone?: "default" | "onBrand"
  className?: string
}

export default function LandingActions({
  tone = "default",
  className,
}: LandingActionsProps) {
  const handlePublish = () => {
    toast.info("로그인은 다음에 붙일게요.")
  }

  const onBrand = tone === "onBrand"

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:gap-3",
        className
      )}
    >
      <Button
        type="button"
        size="lg"
        className={
          onBrand
            ? "h-12 rounded-2xl bg-white px-6 text-[16px] font-semibold text-primary hover:bg-white/90"
            : "h-12 rounded-2xl px-6 text-[16px] font-semibold"
        }
        onClick={handlePublish}
      >
        내 프로젝트 올려보기
      </Button>
      <Link
        href="/discover"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          onBrand
            ? "h-12 rounded-2xl border-white/40 bg-transparent px-6 text-[16px] font-semibold text-white hover:bg-white/10 hover:text-white"
            : "h-12 rounded-2xl px-6 text-[16px] font-semibold"
        )}
      >
        둘러보기
      </Link>
    </div>
  )
}
