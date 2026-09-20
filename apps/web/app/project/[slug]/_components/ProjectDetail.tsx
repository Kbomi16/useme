import Image from "next/image"

import { Badge } from "@workspace/ui/components/badge"

import {
  AppealCardBadges,
  AppealCardSlots,
} from "../../../_components/AppealCard"
import type { SampleProject } from "../../../_components/sampleProjects"
import DiscoverTryButton from "../../../discover/_components/DiscoverTryButton"

type ProjectDetailProps = {
  project: SampleProject
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="flex flex-col gap-12">
      <article
        id="project-overview"
        className="flex scroll-mt-24 flex-col overflow-hidden rounded-3xl bg-card shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5 md:flex-row md:items-stretch dark:shadow-none dark:ring-white/10"
      >
        <div className="relative aspect-video shrink-0 bg-muted md:aspect-auto md:w-[min(42%,22rem)]">
          <Image
            src={project.imageSrc}
            alt=""
            fill
            sizes="(min-width: 768px) 352px, 100vw"
            className="object-contain"
          />
          <AppealCardBadges />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 md:p-7">
          <div className="flex flex-col gap-1.5">
            <Badge variant="secondary" className="w-fit">
              {project.category}
            </Badge>
            <h1 className="text-2xl/snug font-bold tracking-tight break-keep md:text-[32px]/snug">
              {project.name}
            </h1>
            <p className="text-sm/relaxed break-keep text-muted-foreground">
              {project.tagline}
            </p>
          </div>
          <AppealCardSlots project={project} />
          <DiscoverTryButton className="mt-auto w-full rounded-xl" />
        </div>
      </article>

      <section className="flex flex-col gap-8" aria-labelledby="project-story">
        <h2 id="project-story" className="sr-only">
          이 프로젝트가 하는 일
        </h2>
        <StoryBlock
          id="project-story-why"
          title="왜 이런 걸 만들었어요"
          body={project.story.why}
        />
        <StoryBlock
          id="project-story-what"
          title="뭘 하나요"
          body={project.story.what}
        />
        <StoryBlock
          id="project-story-how"
          title="얼마나 달라지나요"
          body={project.story.how}
        />
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="project-steps">
        <h2
          id="project-steps"
          className="scroll-mt-24 text-lg font-bold tracking-tight break-keep"
        >
          이렇게 써요
        </h2>
        <ol className="grid gap-3 sm:grid-cols-3">
          {project.steps.map((step, index) => (
            <li
              key={step}
              className="flex flex-col gap-3 rounded-3xl bg-muted/80 px-4 py-5"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <p className="text-sm/relaxed break-keep">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="flex flex-col gap-4"
        aria-labelledby="project-audience"
      >
        <h2
          id="project-audience"
          className="scroll-mt-24 text-lg font-bold tracking-tight break-keep"
        >
          이런 팀에 맞아요
        </h2>
        <ul className="flex flex-wrap gap-2">
          {project.audience.map((item) => (
            <li key={item}>
              <Badge variant="secondary">{item}</Badge>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function StoryBlock({
  id,
  title,
  body,
}: {
  id: string
  title: string
  body: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3
        id={id}
        className="scroll-mt-24 text-lg font-bold tracking-tight break-keep"
      >
        {title}
      </h3>
      <p className="text-base/relaxed break-keep text-muted-foreground">
        {body}
      </p>
    </div>
  )
}
