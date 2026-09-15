import Image from "next/image"

import Reveal from "./Reveal"

const slots = [
  {
    imageSrc: "/illustrations/slot-why-cut.png",
    title: "왜 만들었어요?",
    body: "뭘 불편해서 만들었는지. 이 한 줄이 카드의 첫 칸이에요.",
  },
  {
    imageSrc: "/illustrations/slot-what-cut.png",
    title: "뭘 했어요?",
    body: "그 불편함을 어떻게 없앴는지. 사람이 바로 이해하게요.",
  },
  {
    imageSrc: "/illustrations/slot-metric-cut.png",
    title: "얼마나 돼요?",
    body: "시간, 횟수, 사람 수처럼 감이 오는 숫자만 넣어요.",
  },
]

export default function LandingCardExplain() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6">
        <Reveal className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2 className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[34px]">
            세 칸만 채우면
            <br />
            카드가 완성돼요
          </h2>
          <p className="text-muted-foreground text-[17px] leading-relaxed break-keep">
            어필 카드는 단톡에 던지는 한 장이에요. 링크 대신 이 장을 보내요.
          </p>
        </Reveal>
        <div className="grid w-full gap-10 sm:grid-cols-3">
          {slots.map((slot, index) => (
            <Reveal key={slot.title} delay={index * 0.08}>
              <article className="flex flex-col items-center gap-4 text-center">
                <Image
                  src={slot.imageSrc}
                  alt=""
                  width={640}
                  height={480}
                  className="h-auto w-full max-w-[240px]"
                />
                <div className="flex flex-col gap-1.5">
                  <p className="text-[17px] font-bold tracking-tight break-keep">
                    {slot.title}
                  </p>
                  <p className="text-muted-foreground text-[14px] leading-relaxed break-keep">
                    {slot.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
