import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

import type { SampleProject } from "./sampleProjects"

type AppealCardProps = {
  project: SampleProject
  className?: string
}

const slots = [
  { key: "problem", n: "1", hint: "왜 만들었어요?" },
  { key: "action", n: "2", hint: "뭘 했어요?" },
  { key: "metric", n: "3", hint: "얼마나 돼요?" },
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
        "bg-card flex h-full flex-col overflow-hidden rounded-[24px] shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5 dark:shadow-none dark:ring-white/10",
        className
      )}
    >
      <div className="bg-secondary relative aspect-4/3">
        <Image
          src={project.imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <p className="text-primary text-[13px] font-semibold">어필 카드</p>
          <h3 className="text-[22px] leading-snug font-bold tracking-tight break-keep">
            {project.name}
          </h3>
          <p className="text-muted-foreground text-[15px] leading-relaxed break-keep">
            {project.tagline}
          </p>
        </div>
        <ol className="flex flex-col gap-3">
          {slots.map((slot) => (
            <li key={slot.key} className="flex gap-3">
              <span className="bg-primary text-primary-foreground mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                {slot.n}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="text-muted-foreground text-[13px]">{slot.hint}</p>
                <p className="text-[15px] leading-relaxed break-keep">
                  {values[slot.key]}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div
          aria-hidden="true"
          className="bg-primary text-primary-foreground mt-auto flex h-12 items-center justify-center rounded-2xl text-[15px] font-semibold"
        >
          써 보기
        </div>
      </div>
    </article>
  )
}
