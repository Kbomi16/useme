import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"

export default function ProjectNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start gap-4 px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
        그 카드는 없어요.
      </h1>
      <Link href="/discover" className={buttonVariants()}>
        둘러보기
      </Link>
    </main>
  )
}
