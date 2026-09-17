import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"

import AppealCard from "../_components/AppealCard"
import {
  featuredProject,
  shelfProjects,
} from "../_components/sampleProjects"
import DiscoverCommentList from "./_components/DiscoverCommentList"
import DiscoverFeaturedCard from "./_components/DiscoverFeaturedCard"
import DiscoverProjectActions from "./_components/DiscoverProjectActions"

export default function DiscoverPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
          둘러보기
        </h1>
        <Link href="/upload" className={buttonVariants()}>
          내 프로젝트 올려보기
        </Link>
      </div>

      <section className="flex flex-col gap-4" aria-labelledby="today-cards">
        <h2
          id="today-cards"
          className="text-lg font-bold tracking-tight break-keep"
        >
          오늘의 카드
        </h2>
        <DiscoverFeaturedCard project={featuredProject}>
          <DiscoverCommentList
            comments={featuredProject.comments}
            className="md:grid md:grid-cols-2"
          />
          <DiscoverProjectActions
            slug={featuredProject.slug}
            className="max-w-sm"
          />
        </DiscoverFeaturedCard>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="recent-cards">
        <h2
          id="recent-cards"
          className="text-lg font-bold tracking-tight break-keep"
        >
          최근 카드
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shelfProjects.map((project) => (
            <li key={project.slug}>
              <AppealCard project={project}>
                <DiscoverProjectActions slug={project.slug} />
              </AppealCard>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
