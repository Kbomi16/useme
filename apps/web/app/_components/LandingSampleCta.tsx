"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Button, buttonVariants } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"
import { cn } from "@workspace/ui/lib/utils"

export default function LandingSampleCta() {
  const [visible, setVisible] = useState(false)

  const handlePublish = () => {
    toast.info("로그인은 다음에 붙일게요.")
  }

  useEffect(() => {
    const samples = document.getElementById("sample-cards")
    const band = document.getElementById("landing-cta")
    if (!samples || !band) return

    const sync = () => {
      const viewportHeight = window.innerHeight
      const samplesReached =
        samples.getBoundingClientRect().top < viewportHeight * 0.6
      const bandVisible =
        band.getBoundingClientRect().top < viewportHeight * 0.85
      setVisible(samplesReached && !bandVisible)
    }

    sync()
    window.addEventListener("scroll", sync, { passive: true })
    window.addEventListener("resize", sync)
    return () => {
      window.removeEventListener("scroll", sync)
      window.removeEventListener("resize", sync)
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-6 z-30 flex justify-center px-4 transition-all duration-300 motion-reduce:transition-none sm:px-6",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <div
        aria-hidden={!visible}
        className="flex w-full max-w-2xl items-center gap-3 rounded-full bg-background py-2.5 pr-2.5 pl-6 shadow-[0_10px_40px_rgb(15_23_42/0.12)] ring-1 ring-black/8 sm:gap-4 sm:py-3 sm:pr-3 sm:pl-7 dark:ring-white/10"
      >
        <p className="min-w-0 flex-1 text-[13px]/snug font-semibold tracking-tight break-keep sm:text-[15px]/snug">
          내 토이 프로젝트도 카드로 만들어볼까요?
        </p>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button
            type="button"
            tabIndex={visible ? 0 : -1}
            className="h-11 rounded-full px-4 text-[13px] font-semibold sm:h-12 sm:px-5 sm:text-sm"
            onClick={handlePublish}
          >
            내 프로젝트 올려보기
          </Button>
          <Link
            href="/discover"
            tabIndex={visible ? 0 : -1}
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-11 rounded-full border-transparent bg-foreground px-4 text-[13px] font-semibold text-background hover:bg-foreground/90 hover:text-background sm:h-12 sm:px-5 sm:text-sm"
            )}
          >
            둘러보기
          </Link>
        </div>
      </div>
    </div>
  )
}
