import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

import {
  projectCategories,
  type ProjectCategory,
} from "../../_components/sampleProjects"

export type DiscoverCategoryFilter = "전체" | ProjectCategory

const categoryIcons = {
  전체: {
    src: "/illustrations/clay-all.png",
    label: "전체",
  },
  생산성: {
    src: "/illustrations/clay-work.png",
    label: "생산성",
  },
  개발: {
    src: "/illustrations/clay-dev.png",
    label: "개발",
  },
  생활: {
    src: "/illustrations/clay-life.png",
    label: "생활",
  },
  소셜: {
    src: "/illustrations/clay-social.png",
    label: "소셜",
  },
} as const

const filters: DiscoverCategoryFilter[] = ["전체", ...projectCategories]

type DiscoverCategoryNavProps = {
  selected: DiscoverCategoryFilter
  onSelect: (next: DiscoverCategoryFilter) => void
}

export default function DiscoverCategoryNav({
  selected,
  onSelect,
}: DiscoverCategoryNavProps) {
  return (
    <div
      role="tablist"
      aria-label="프로젝트 카테고리"
      className="flex w-full flex-wrap items-start justify-center gap-3 sm:gap-5"
    >
      {filters.map((filter) => {
        const icon = categoryIcons[filter]
        const isSelected = filter === selected

        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={cn(
              "group flex w-16 cursor-pointer flex-col items-center gap-1.5 rounded-2xl px-1 py-1.5 text-[12px] font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:w-18 sm:text-[13px]",
              isSelected
                ? "bg-primary/10 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onSelect(filter)}
          >
            <span className="flex size-14 items-center justify-center transition-transform duration-200 ease-out group-hover:-translate-y-1 sm:size-16">
              <Image
                src={icon.src}
                alt=""
                width={128}
                height={128}
                sizes="(min-width: 640px) 4rem, 3.5rem"
                unoptimized
                className="size-full object-contain mix-blend-multiply"
              />
            </span>
            <span className={cn("rounded-lg px-2 py-0.5 transition-colors")}>
              {icon.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
