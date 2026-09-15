import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import Reveal from "./Reveal"

const points = [
  {
    title: "둘러보기",
    body: "다른 사람 카드가 여기 모여 있어요.",
  },
  {
    title: "써 보기",
    body: "직접 눌러 봐야 뭐가 좋은지 감이 와요.",
  },
  {
    title: "한마디",
    body: "만져 본 사람이 좋아요나 한 줄을 남겨요.",
  },
]

export default function LandingFeedback() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6">
        <Reveal className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2 className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[34px]">
            다른 사람 프로젝트도
            <br />
            써 보고 남겨요
          </h2>
          <p className="text-muted-foreground text-[17px] leading-relaxed break-keep">
            내 카드만 만드는 곳이 아니에요. 둘러보기에서 고르고, 만져 본 다음
            피드백을 남길 수 있어요.
          </p>
        </Reveal>
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Image
              src="/illustrations/flat-feedback.png"
              alt=""
              width={1280}
              height={720}
              className="h-auto w-full"
            />
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-8">
            <ol className="flex flex-col gap-6">
              {points.map((point, index) => (
                <li key={point.title} className="flex gap-4">
                  <span className="bg-primary text-primary-foreground mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[18px] font-bold tracking-tight break-keep">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground text-[15px] leading-relaxed break-keep">
                      {point.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/discover"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 w-fit rounded-2xl px-6 text-[16px] font-semibold"
              )}
            >
              다른 사람 카드 보러 가기
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
