import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

import type { SampleProject } from "./sampleProjects"

type AppealCardProps = {
  project: SampleProject
  className?: string
}

const slots = [
  { key: "problem", hint: "왜" },
  { key: "action", hint: "뭘" },
  { key: "metric", hint: "얼마나" },
] as const

export default function AppealCard({ project, className }: AppealCardProps) {
  const values = {
    problem: project.problem,
    action: project.action,
    metric: project.metric,
  }

  return (
    <article
      className={cn(
        "bg-card flex h-full flex-col overflow-hidden rounded-[22px] shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5 dark:shadow-none dark:ring-white/10",
        className
      )}
    >
      <div className="bg-muted relative aspect-16/9">
        <Image
          src={project.imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 280px, 50vw"
          className="object-contain"
        />
        <span className="bg-background/90 text-primary absolute top-3 left-3 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-black/5">
          예시 프로젝트
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-[18px] leading-snug font-bold tracking-tight break-keep">
            {project.name}
          </h3>
          <p className="text-muted-foreground text-[13px] leading-relaxed break-keep">
            {project.tagline}
          </p>
        </div>
        <ul className="flex flex-col gap-1.5">
          {slots.map((slot) => (
            <li key={slot.key} className="flex items-start gap-2">
              <span className="bg-secondary text-secondary-foreground mt-0.5 inline-flex shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold">
                {slot.hint}
              </span>
              <p className="text-[13px] leading-snug break-keep">
                {values[slot.key]}
              </p>
            </li>
          ))}
        </ul>
        <div
          aria-hidden="true"
          className="bg-primary text-primary-foreground mt-auto flex h-10 items-center justify-center rounded-xl text-[13px] font-semibold"
        >
          써 보기
        </div>
      </div>
    </article>
  )
}
