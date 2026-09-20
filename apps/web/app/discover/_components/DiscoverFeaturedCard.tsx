import Image from "next/image"
import type { ReactNode } from "react"

import {
  AppealCardBadges,
  AppealCardSlots,
} from "../../_components/AppealCard"
import type { SampleProject } from "../../_components/sampleProjects"

type DiscoverFeaturedCardProps = {
  project: SampleProject
  children?: ReactNode
}

export default function DiscoverFeaturedCard({
  project,
  children,
}: DiscoverFeaturedCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5 md:flex-row md:items-stretch dark:shadow-none dark:ring-white/10">
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
          <h3 className="text-2xl/snug font-bold tracking-tight break-keep">
            {project.name}
          </h3>
          <p className="text-sm/relaxed break-keep text-muted-foreground">
            {project.tagline}
          </p>
        </div>
        <AppealCardSlots project={project} />
        {children ? (
          <div className="mt-auto flex flex-col gap-3">{children}</div>
        ) : null}
      </div>
    </article>
  )
}
