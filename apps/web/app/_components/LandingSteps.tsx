"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

const stages = [
  {
    id: "upload",
    n: "1",
    label: "올리기",
    title: "프로젝트를 올려요",
    body: "이름, 한 줄, 써 볼 수 있는 주소만 먼저 적어요.",
    imageSrc: "/illustrations/step-upload-cut.png",
  },
  {
    id: "fill",
    n: "2",
    label: "세 칸",
    title: "왜, 뭘, 얼마나 채워요",
    body: "이 세 줄이 그대로 카드가 돼요.",
    imageSrc: "/illustrations/step-fill-cut.png",
  },
  {
    id: "share",
    n: "3",
    label: "뿌리기",
    title: "한 장으로 뿌려요",
    body: "단톡이든 트위터든, 같은 카드를 붙여요.",
    imageSrc: "/illustrations/step-share-cut.png",
  },
  {
    id: "try",
    n: "4",
    label: "써 보기",
    title: "써 본 사람이 남겨요",
    body: "직접 만져 보고 좋아요나 한마디가 돌아와요.",
    imageSrc: "/illustrations/step-try-heart.png",
  },
]

export default function LandingSteps() {
  const [activeId, setActiveId] = useState(stages[0]?.id ?? "upload")
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const root = listRef.current
    if (!root) return

    const items = [...root.querySelectorAll("[data-step]")]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const nextId = visible?.target.getAttribute("data-step")
        if (nextId) setActiveId(nextId)
      },
      { threshold: 0.5, rootMargin: "-25% 0px -35% 0px" }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const active = stages.find((stage) => stage.id === activeId) ?? stages[0]

  if (!active) return null

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6">
        <h2 className="text-center text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[34px]">
          올리는 순서는 이래요
        </h2>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24">
            <div className="bg-muted flex min-h-80 items-center justify-center rounded-[28px] px-4 py-8">
              <Image
                src={active.imageSrc}
                alt=""
                width={720}
                height={720}
                className="h-auto w-full max-w-sm"
              />
            </div>
            <p className="mt-4 text-[15px] font-semibold tracking-tight break-keep">
              <span className="text-primary">{active.n}</span>
              {" · "}
              {active.title}
            </p>
          </div>
          <ol ref={listRef} className="relative flex flex-col">
            <span
              aria-hidden="true"
              className="bg-border absolute top-6 bottom-6 left-[15px] w-px lg:left-[19px]"
            />
            {stages.map((stage) => {
              const selected = stage.id === activeId
              return (
                <li
                  key={stage.id}
                  data-step={stage.id}
                  className="relative min-h-[48vh] py-8 pl-12 lg:min-h-[42vh]"
                >
                  <span
                    className={cn(
                      "absolute top-8 left-0 inline-flex size-8 items-center justify-center rounded-full text-[13px] font-bold lg:size-10 lg:text-[15px]",
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {stage.n}
                  </span>
                  <p className="text-primary text-[13px] font-semibold">
                    {stage.label}
                  </p>
                  <h3 className="mt-1 text-[22px] font-bold tracking-tight break-keep">
                    {stage.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-[16px] leading-relaxed break-keep">
                    {stage.body}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
