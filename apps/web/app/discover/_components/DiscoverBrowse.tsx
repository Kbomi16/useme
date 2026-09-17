"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import Link from "next/link"
import {
  BriefcaseIcon,
  CodeIcon,
  LayoutGridIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react"

import { buttonVariants } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

import AppealCard from "../../_components/AppealCard"
import {
  projectCategories,
  type ProjectCategory,
  type SampleProject,
} from "../../_components/sampleProjects"
import DiscoverCommentList from "./DiscoverCommentList"
import DiscoverFeaturedCard from "./DiscoverFeaturedCard"
import DiscoverProjectActions from "./DiscoverProjectActions"
import DiscoverPromoBanner from "./DiscoverPromoBanner"

type CategoryFilter = "전체" | ProjectCategory

type DiscoverBrowseProps = {
  featured: SampleProject
  shelf: SampleProject[]
}

const categoryIcons = {
  전체: LayoutGridIcon,
  생산성: BriefcaseIcon,
  개발: CodeIcon,
  생활: WalletIcon,
  소셜: UsersIcon,
} as const

const filters: CategoryFilter[] = ["전체", ...projectCategories]

export default function DiscoverBrowse({
  featured,
  shelf,
}: DiscoverBrowseProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<CategoryFilter>("전체")

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value)
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  const handleSelectCategory = (next: CategoryFilter) => {
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
      <div className="flex flex-col items-center gap-6 text-center">
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
          <Input
            id="discover-query"
            value={query}
            placeholder="자리비움, 영수증함, 커밋모음"
            className="h-10 flex-1"
            onChange={handleQueryChange}
          />
          <Link href="/upload" className={buttonVariants()}>
            내 프로젝트 올려보기
          </Link>
        </form>
        <CategoryNav
          selected={category}
          onSelect={handleSelectCategory}
        />
      </div>

      <DiscoverPromoBanner />

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
                <DiscoverCommentList
                  comments={featuredMatch.comments}
                  className="md:grid md:grid-cols-2"
                />
                <DiscoverProjectActions
                  slug={featuredMatch.slug}
                  className="max-w-sm"
                />
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

type CategoryNavProps = {
  selected: CategoryFilter
  onSelect: (next: CategoryFilter) => void
}

function CategoryNav({ selected, onSelect }: CategoryNavProps) {
  return (
    <div
      role="tablist"
      aria-label="프로젝트 카테고리"
      className="flex w-full flex-wrap items-start justify-center gap-1 sm:gap-2"
    >
      {filters.map((filter) => {
        const Icon = categoryIcons[filter]
        const isSelected = filter === selected

        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={cn(
              "flex min-w-16 flex-col items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
              isSelected
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            onClick={() => onSelect(filter)}
          >
            <Icon className="size-6" />
            {filter}
          </button>
        )
      })}
    </div>
  )
}
