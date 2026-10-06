import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { AppealCardSlots } from "../../../_components/AppealCard"
import { getProjectCoverUrl } from "@/libs/projects/covers"
import type { SavedProject } from "@/libs/projects/types"

type PublishedProjectProps = {
  project: SavedProject
}

export default function PublishedProject({ project }: PublishedProjectProps) {
  const coverUrl = getProjectCoverUrl(project.coverPath, project.updatedAt)

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-12 md:px-6 md:py-16">
      <article className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-[0_8px_24px_rgb(15_23_42/0.06)] ring-1 ring-black/5 dark:shadow-none dark:ring-white/10">
        <div className="relative aspect-video bg-muted">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt=""
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-contain"
            />
          ) : (
            <p className="flex size-full items-center justify-center px-4 text-center text-[13px] break-keep text-muted-foreground">
              이미지 없음
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4 p-5 md:p-7">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl/snug font-bold tracking-tight break-keep md:text-[32px]/snug">
              {project.name}
            </h1>
            <p className="text-sm/relaxed break-keep text-muted-foreground">
              {project.tagline}
            </p>
          </div>
          <AppealCardSlots project={project} />
          <Link
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants(), "mt-2 w-full rounded-xl")}
          >
            써 보기
          </Link>
        </div>
      </article>
      <section className="flex flex-col gap-3" aria-labelledby="project-body">
        <h2 id="project-body" className="text-lg font-bold tracking-tight">
          프로젝트 설명
        </h2>
        <p className="text-[15px]/relaxed break-keep whitespace-pre-wrap">
          {project.body}
        </p>
      </section>
    </main>
  )
}
