"use client"

import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import Link from "next/link"
import { XIcon } from "lucide-react"

import { Button, buttonVariants } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

import AppealCard from "../../_components/AppealCard"
import { type SampleProject } from "../../_components/sampleProjects"
import DiscoverCategoryNav, {
  type DiscoverCategoryFilter,
} from "./DiscoverCategoryNav"
import DiscoverFeaturedCard from "./DiscoverFeaturedCard"
import DiscoverProjectActions from "./DiscoverProjectActions"

type DiscoverBrowseProps = {
  featured: SampleProject
  shelf: SampleProject[]
}

export default function DiscoverBrowse({
  featured,
  shelf,
}: DiscoverBrowseProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<DiscoverCategoryFilter>("전체")

  const queryRef = useRef<HTMLInputElement>(null)

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value)
  }
  const handleClearQuery = () => {
    setQuery("")
    queryRef.current?.focus()
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const handleSelectCategory = (next: DiscoverCategoryFilter) => {
    setCategory(next)
  }

  const allProjects = [featured, ...shelf]
  const normalizedQuery = query.trim()
  const filtered = allProjects.filter((project) => {
    const matchesCategory =
      category === "전체" || project.category === category
    const matchesQuery =
      normalizedQuery.length === 0 ||
      project.name.includes(normalizedQuery) ||
      project.tagline.includes(normalizedQuery)

    return matchesCategory && matchesQuery
  })
  const featuredMatch = filtered.find(
    (project) => project.slug === featured.slug
  )
  const recentMatches = filtered.filter(
    (project) => project.slug !== featured.slug
  )
  const isEmpty = filtered.length === 0

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-8 text-center sm:gap-10">
        <h1 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
          어떤 프로젝트를 써 볼까요?
        </h1>
        <form
          className="flex w-full max-w-2xl flex-col items-stretch gap-2 sm:flex-row sm:items-center"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="discover-query">
            프로젝트 찾기
          </label>
          <div className="relative min-w-0 flex-1">
            <Input
              ref={queryRef}
              id="discover-query"
              value={query}
              placeholder="이름이나 한 줄 소개로 검색해 보세요"
              className={cn("h-10", query ? "pr-10" : "")}
              onChange={handleQueryChange}
            />
            {query ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground"
                aria-label="검색어 지우기"
                onClick={handleClearQuery}
              >
                <XIcon />
              </Button>
            ) : null}
          </div>
          <Link href="/upload" className={buttonVariants()}>
            내 프로젝트 올려보기
          </Link>
        </form>
        <DiscoverCategoryNav
          selected={category}
          onSelect={handleSelectCategory}
        />
      </div>

      {isEmpty ? (
        <p className="py-16 text-center text-[17px]/relaxed break-keep text-muted-foreground">
          이 칸에는 아직 카드가 없어요.
        </p>
      ) : (
        <>
          {featuredMatch ? (
            <section className="flex flex-col gap-4" aria-labelledby="today-cards">
              <h2
                id="today-cards"
                className="text-lg font-bold tracking-tight break-keep"
              >
                오늘의 카드
              </h2>
              <DiscoverFeaturedCard project={featuredMatch}>
                <DiscoverProjectActions slug={featuredMatch.slug} />
              </DiscoverFeaturedCard>
            </section>
          ) : null}

          {recentMatches.length > 0 ? (
            <section
              className="flex flex-col gap-4"
              aria-labelledby="recent-cards"
            >
              <h2
                id="recent-cards"
                className="text-lg font-bold tracking-tight break-keep"
              >
                최근 카드
              </h2>
              <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {recentMatches.map((project) => (
                  <li key={project.slug}>
                    <AppealCard project={project}>
                      <DiscoverProjectActions slug={project.slug} />
                    </AppealCard>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </div>
  )
}
