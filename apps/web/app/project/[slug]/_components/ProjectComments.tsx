"use client"

import { useState, type FormEvent } from "react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"

import {
  commentCategories,
  type CommentCategory,
  type SampleComment,
} from "../../../_components/sampleProjects"

type CommentFilter = "전체" | CommentCategory
type ComposerTab = "write" | "preview"

const filters: CommentFilter[] = ["전체", ...commentCategories]

const categoryChipClass = {
  일반: "border-transparent bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  피드백: "border-transparent bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  버그: "border-transparent bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  질문: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  응원: "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
} as const

type ProjectCommentsProps = {
  comments: SampleComment[]
}

export default function ProjectComments({ comments }: ProjectCommentsProps) {
  const [draft, setDraft] = useState("")
  const [category, setCategory] = useState<CommentCategory>("일반")
  const [filter, setFilter] = useState<CommentFilter>("전체")
  const [items, setItems] = useState(comments)
  const [composerTab, setComposerTab] = useState<ComposerTab>("write")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const line = draft.trim()
    if (!line) return

    setItems((current) => [
      {
        id: crypto.randomUUID(),
        name: "나",
        line,
        category,
      },
      ...current,
    ])
    setDraft("")
    setComposerTab("write")
    setFilter(category)
  }

  const handleSelectFilter = (next: CommentFilter) => {
    setFilter(next)
  }

  const handleSelectCategory = (next: CommentCategory) => {
    setCategory(next)
  }

  const handleSelectComposerTab = (next: ComposerTab) => {
    setComposerTab(next)
  }

  const visible =
    filter === "전체"
      ? items
      : items.filter((item) => item.category === filter)

  return (
    <section className="flex flex-col gap-5" aria-labelledby="project-feedback">
      <div className="flex flex-col gap-1">
        <h2
          id="project-feedback"
          className="scroll-mt-24 text-lg font-bold tracking-tight break-keep"
        >
          받은 피드백
        </h2>
        <p className="text-sm text-muted-foreground">
          {items.length}개의 한마디가 있어요.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="한마디 종류 필터"
        className="flex flex-wrap gap-1 border-b"
      >
        {filters.map((item) => {
          const count =
            item === "전체"
              ? items.length
              : items.filter((comment) => comment.category === item).length
          const isSelected = item === filter

          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={cn(
                "-mb-px cursor-pointer border-b-2 px-2.5 py-2 text-[13px] outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isSelected
                  ? "border-primary font-semibold text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              onClick={() => handleSelectFilter(item)}
            >
              {item}
              <span className="ml-1 text-muted-foreground">{count}</span>
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p className="py-8 text-center text-sm break-keep text-muted-foreground">
          이 종류의 한마디는 아직 없어요.
        </p>
      ) : (
        <ul className="relative flex flex-col gap-4 before:absolute before:top-4 before:bottom-4 before:left-4 before:w-px before:bg-border">
          {visible.map((comment) => (
            <li key={comment.id} className="relative flex items-start gap-3">
              <CommentAvatar name={comment.name} />
              <div className="relative min-w-0 flex-1 rounded-md border bg-card">
                <span
                  aria-hidden
                  className="absolute top-3 -left-1.75 size-0 border-y-8 border-r-8 border-y-transparent border-r-border"
                />
                <span
                  aria-hidden
                  className="absolute top-3 -left-1.5 size-0 border-y-8 border-r-8 border-y-transparent border-r-muted"
                />
                <div className="flex flex-wrap items-center gap-2 rounded-t-md border-b bg-muted/50 px-3 py-2">
                  <p className="text-sm font-semibold">{comment.name}</p>
                  <Badge
                    variant="outline"
                    className={cn("ml-auto", categoryChipClass[comment.category])}
                  >
                    {comment.category}
                  </Badge>
                </div>
                <p className="px-3 py-3 text-sm/relaxed break-keep">
                  {comment.line}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form className="flex items-start gap-3" onSubmit={handleSubmit}>
        <CommentAvatar name="나" />
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-md border bg-card">
          <span
            aria-hidden
            className="absolute top-3 -left-1.75 z-10 size-0 border-y-8 border-r-8 border-y-transparent border-r-border"
          />
          <span
            aria-hidden
            className="absolute top-3 -left-1.5 z-10 size-0 border-y-8 border-r-8 border-y-transparent border-r-muted"
          />
          <div
            role="tablist"
            aria-label="작성 방식"
            className="flex gap-1 border-b bg-muted/50 px-2 pt-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={composerTab === "write"}
              className={cn(
                "-mb-px cursor-pointer rounded-t-md border px-3 py-1.5 text-[13px] font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                composerTab === "write"
                  ? "border-border border-b-card bg-card text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              onClick={() => handleSelectComposerTab("write")}
            >
              작성
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={composerTab === "preview"}
              className={cn(
                "-mb-px cursor-pointer rounded-t-md border px-3 py-1.5 text-[13px] font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                composerTab === "preview"
                  ? "border-border border-b-card bg-card text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              onClick={() => handleSelectComposerTab("preview")}
            >
              미리보기
            </button>
          </div>
          {composerTab === "write" ? (
            <Textarea
              id="project-comment"
              value={draft}
              placeholder="써 보면서 느낀 점을 남겨 주세요"
              aria-label="한마디 남기기"
              className="min-h-32 rounded-none border-0 bg-transparent px-3 py-3 shadow-none focus-visible:ring-0 dark:bg-transparent"
              onChange={(event) => setDraft(event.currentTarget.value)}
            />
          ) : (
            <div className="min-h-32 px-3 py-3 text-sm/relaxed break-keep">
              {draft.trim() ? (
                draft
              ) : (
                <span className="text-muted-foreground">
                  미리 볼 내용이 없어요.
                </span>
              )}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/40 px-3 py-2">
            <fieldset>
              <legend className="sr-only">종류</legend>
              <div
                role="radiogroup"
                aria-label="한마디 종류"
                className="flex flex-wrap gap-1"
              >
                {commentCategories.map((item) => {
                  const isSelected = item === category

                  return (
                    <label
                      key={item}
                      className={cn(
                        "cursor-pointer rounded-full border px-2 py-0.5 text-[11px] font-medium outline-none transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                        isSelected
                          ? categoryChipClass[item]
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <input
                        type="radio"
                        name="comment-category"
                        value={item}
                        checked={isSelected}
                        className="sr-only"
                        onChange={() => handleSelectCategory(item)}
                      />
                      {item}
                    </label>
                  )
                })}
              </div>
            </fieldset>
            <Button
              type="submit"
              size="sm"
              className="rounded-md"
              disabled={!draft.trim()}
            >
              남기기
            </Button>
          </div>
        </div>
      </form>
    </section>
  )
}

function CommentAvatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[12px] font-semibold text-muted-foreground ring-2 ring-background"
    >
      {name.slice(0, 1)}
    </span>
  )
}
