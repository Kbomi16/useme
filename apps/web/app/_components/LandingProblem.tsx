import Image from "next/image"

import AppealCard from "./AppealCard"
import Reveal from "./Reveal"
import { sampleProjects, type SampleProject } from "./sampleProjects"

export default function LandingProblem() {
  const sample = sampleProjects[0]

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6">
        <Reveal className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2 className="text-muted-foreground text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[34px]">
            링크만 보내는 공유는 그만
          </h2>
          <p className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[34px]">
            한 장으로 써 보게 해요
          </p>
        </Reveal>
        <div className="grid w-full gap-10 md:grid-cols-2">
          <Reveal>
            <figure className="flex flex-col items-center gap-4 text-center">
              <div className="bg-muted flex aspect-[4/3] w-full max-w-sm items-center justify-center overflow-hidden rounded-[28px]">
                <Image
                  src="/illustrations/flat-link.png"
                  alt=""
                  width={720}
                  height={540}
                  className="h-auto w-[70%]"
                />
              </div>
              <figcaption className="flex flex-col gap-1">
                <p className="text-muted-foreground text-[13px] font-semibold">
                  지금처럼 링크만
                </p>
                <p className="text-[16px] font-bold tracking-tight break-keep">
                  한 줄 떨어지고 끝나요
                </p>
                <p className="text-muted-foreground text-[14px] leading-relaxed break-keep">
                  github.com/me/toy. 뭘 하는 건지 안 보여요.
                </p>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="flex flex-col items-center gap-4 text-center">
              {sample ? <AppealCardDevice project={sample} /> : null}
              <figcaption className="flex flex-col gap-1">
                <p className="text-primary text-[13px] font-semibold">
                  useMe 어필 카드
                </p>
                <p className="text-[16px] font-bold tracking-tight break-keep">
                  왜, 뭘, 얼마나 한 장에
                </p>
                <p className="text-muted-foreground text-[14px] leading-relaxed break-keep">
                  단톡에 이 장을 보내면 바로 눌러 볼 수 있어요.
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function AppealCardDevice({ project }: { project: SampleProject }) {
  return (
    <div className="bg-muted relative flex aspect-[4/3] w-full max-w-sm items-center justify-center overflow-hidden rounded-[28px]">
      <div
        aria-hidden="true"
        className="absolute top-7 left-5 h-12 w-[4.5rem] rounded-2xl rounded-bl-sm bg-[#F5C518]"
      />
      <div className="relative origin-center rotate-[-7deg] scale-[0.64]">
        <div className="w-[252px] rounded-[34px] bg-[#2a2438] p-[8px] shadow-[0_22px_44px_rgb(42_36_56/0.32)]">
          <div className="mx-auto mb-1.5 h-1 w-11 rounded-full bg-white/25" />
          <div className="overflow-hidden rounded-[26px]">
            <AppealCard project={project} />
          </div>
        </div>
      </div>
    </div>
  )
}
