import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import AppealCard from "../_components/AppealCard"
import { sampleProjects } from "../_components/sampleProjects"

export default function DiscoverPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex max-w-xl flex-col gap-2">
          <p className="text-sm font-semibold text-primary">둘러보기</p>
          <h1 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
            다른 사람 카드
          </h1>
          <p className="text-[17px]/relaxed break-keep text-muted-foreground">
            만져 보고 한마디 남기면 돼요. 지금은 예시 카드예요.
          </p>
        </div>
        <Link
          href="/upload"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 rounded-2xl px-5 text-[15px] font-semibold"
          )}
        >
          내 프로젝트 올려보기
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleProjects.map((project) => (
          <AppealCard key={project.name} project={project} />
        ))}
      </div>
    </main>
  )
}
