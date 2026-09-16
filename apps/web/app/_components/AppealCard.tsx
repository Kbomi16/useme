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
        "flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5 dark:shadow-none dark:ring-white/10",
        className
      )}
    >
      <div className="relative aspect-video bg-muted">
        <Image
          src={project.imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 280px, 50vw"
          className="object-contain"
        />
        <span className="absolute top-3 left-3 z-10 rounded-full bg-background/90 px-2.5 py-0.5 text-[11px] font-semibold text-primary ring-1 ring-black/5">
          예시 프로젝트
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg/snug font-bold tracking-tight break-keep">
            {project.name}
          </h3>
          <p className="text-[13px]/relaxed break-keep text-muted-foreground">
            {project.tagline}
          </p>
        </div>
        <ul className="flex flex-col gap-1.5">
          {slots.map((slot) => (
            <li key={slot.key} className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex shrink-0 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                {slot.hint}
              </span>
              <p className="text-[13px]/snug break-keep">{values[slot.key]}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
