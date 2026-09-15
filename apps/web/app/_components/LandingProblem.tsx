import Image from "next/image"

import Reveal from "./Reveal"

export default function LandingProblem() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6">
        <Reveal className="flex flex-col gap-3">
          <h2 className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[32px]">
            공유는 했는데,
            <br />
            아무도 안 써 봤어요.
          </h2>
          <p className="text-muted-foreground max-w-xl text-[17px] leading-relaxed break-keep">
            단톡에 링크만 떨어지면 잠깐 보고 끝이에요. 왜 만들었는지가 안 보이면
            “나중에”가 돼요.
          </p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <figure className="bg-card flex flex-col gap-4 rounded-[24px] p-5 shadow-[0_8px_24px_rgb(15_23_42/0.04)] ring-1 ring-black/5 dark:ring-white/10">
              <Image
                src="/illustrations/chat-link.png"
                alt=""
                width={800}
                height={600}
                className="h-auto w-full rounded-2xl"
              />
              <figcaption className="flex flex-col gap-1">
                <p className="text-[15px] font-semibold">지금처럼 링크만</p>
                <p className="text-muted-foreground text-[14px] leading-relaxed break-keep">
                  github.com/me/toy 한 줄. 뭘 하는 건지 안 보여요.
                </p>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="bg-card flex flex-col gap-4 rounded-[24px] p-5 shadow-[0_8px_24px_rgb(15_23_42/0.04)] ring-1 ring-black/5 dark:ring-white/10">
              <Image
                src="/illustrations/share-card.png"
                alt=""
                width={800}
                height={600}
                className="h-auto w-full rounded-2xl"
              />
              <figcaption className="flex flex-col gap-1">
                <p className="text-[15px] font-semibold">useMe 어필 카드</p>
                <p className="text-muted-foreground text-[14px] leading-relaxed break-keep">
                  왜, 뭘, 얼마나 — 세 줄이 카드에 들어가요.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
