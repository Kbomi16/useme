import Link from "next/link"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import {
  CommentScreenMock,
  DiscoverScreenMock,
  ReceiveScreenMock,
  TryScreenMock,
} from "./LandingFeedbackMocks"
import Reveal from "./Reveal"

const giveSteps = [
  {
    n: "1",
    title: "둘러보기",
    body: "다른 사람 카드가 여기 모여 있어요.",
    Mock: DiscoverScreenMock,
  },
  {
    n: "2",
    title: "써 보기",
    body: "직접 눌러 봐야 뭐가 좋은지 감이 와요.",
    Mock: TryScreenMock,
  },
  {
    n: "3",
    title: "한마디",
    body: "만져 본 다음 좋아요나 한 줄을 남기면 돼요.",
    Mock: CommentScreenMock,
  },
]

export default function LandingFeedback() {
  return (
    <section id="landing-feedback" className="py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-16 px-6">
        <Reveal className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2 className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[34px]">
            다른 사람 것도 남기고,
            <br />
            내 것도 받아요
          </h2>
          <p className="text-muted-foreground text-[17px] leading-relaxed break-keep">
            내 카드만 만드는 곳이 아니에요. 둘러보기에서 만져 보고 한마디를
            남기면, 내가 뿌린 카드에도 좋아요와 한 줄이 쌓여요.
          </p>
        </Reveal>

        <div className="flex w-full flex-col gap-8">
          <Reveal className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-primary text-[13px] font-semibold">남 카드에</p>
            <h3 className="text-[22px] font-bold tracking-tight break-keep">
              먼저 써 보고 남겨요
            </h3>
          </Reveal>
          <ol className="grid w-full gap-8 md:grid-cols-3">
            {giveSteps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-4">
                <Reveal delay={index * 0.08} className="flex flex-col gap-4">
                  <div
                    aria-hidden="true"
                    className="bg-muted flex min-h-80 items-stretch justify-center overflow-hidden rounded-[28px] px-4 py-6"
                  >
                    <step.Mock />
                  </div>
                  <div className="flex flex-col gap-1 text-center md:text-left">
                    <p className="text-primary text-[13px] font-semibold">
                      {step.n} · {step.title}
                    </p>
                    <p className="text-muted-foreground text-[15px] leading-relaxed break-keep">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex w-full flex-col gap-8">
          <Reveal className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-primary text-[13px] font-semibold">내 카드로</p>
            <h3 className="text-[22px] font-bold tracking-tight break-keep">
              뿌려 두면 말이 돌아와요
            </h3>
            <p className="text-muted-foreground text-[15px] leading-relaxed break-keep">
              단톡에 같은 장을 보내면, 만져 본 사람이 좋아요나 한마디를 남겨요.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div
              aria-hidden="true"
              className="bg-muted flex items-center justify-center overflow-hidden rounded-[28px] px-6 py-10"
            >
              <ReceiveScreenMock />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <Link
            href="/discover"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-2xl px-6 text-[16px] font-semibold"
            )}
          >
            다른 사람 카드 보러 가기
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
