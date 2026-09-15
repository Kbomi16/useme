import AppealCard from "./AppealCard"
import Reveal from "./Reveal"
import { sampleProjects } from "./sampleProjects"

export default function LandingCardExplain() {
  const featured = sampleProjects[0]

  return (
    <section className="mx-auto grid w-full max-w-5xl items-start gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] sm:py-20">
      <Reveal className="flex flex-col gap-6">
        <h2 className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[32px]">
          어필 카드는
          <br />
          단톡에 던지는 한 장이에요.
        </h2>
        <p className="text-muted-foreground max-w-md text-[17px] leading-relaxed break-keep">
          링크 대신 이 장을 보내요. 아래 세 칸만 채우면 카드가 완성돼요.
        </p>
        <ol className="flex flex-col gap-4">
          <li className="flex gap-3">
            <span className="bg-primary text-primary-foreground mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold">
              1
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">왜 만들었어요?</p>
              <p className="text-muted-foreground text-[15px] leading-relaxed break-keep">
                뭘 불편해서 만들었는지.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-primary text-primary-foreground mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold">
              2
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">뭘 했어요?</p>
              <p className="text-muted-foreground text-[15px] leading-relaxed break-keep">
                그 불편함을 어떻게 없앴는지.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-primary text-primary-foreground mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold">
              3
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">얼마나 돼요?</p>
              <p className="text-muted-foreground text-[15px] leading-relaxed break-keep">
                시간, 횟수, 사람 수처럼 바로 감이 오는 숫자.
              </p>
            </div>
          </li>
        </ol>
      </Reveal>
      {featured ? (
        <Reveal delay={0.1}>
          <AppealCard project={featured} />
        </Reveal>
      ) : null}
    </section>
  )
}
