import Image from "next/image"

import StaggerReveal from "./StaggerReveal"
import { sampleProjects, type SampleProject } from "./sampleProjects"

export default function LandingProblem() {
  const sample = sampleProjects[0]

  return (
    <section id="landing-problem" className="scroll-mt-20 py-16 sm:py-24">
      <StaggerReveal className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6">
        <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2
            data-stagger
            className="text-muted-foreground text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[34px]"
          >
            링크만 보내는 공유는 그만
          </h2>
          <p
            data-stagger
            className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[34px]"
          >
            한 장으로 써 보게 해요
          </p>
        </div>
        <div className="grid w-full gap-10 md:grid-cols-2">
          <figure
            data-stagger
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="bg-muted flex aspect-4/3 w-full max-w-sm items-center justify-center overflow-hidden rounded-[28px]">
              <Image
                src="/illustrations/link-chat.png"
                alt=""
                width={720}
                height={540}
                className="h-auto w-[70%]"
              />
            </div>
            <figcaption className="flex flex-col gap-1">
              <p className="text-destructive text-[13px] font-semibold">
                지금처럼 링크만
              </p>
              <p className="text-[16px] font-bold tracking-tight break-keep">
                한 줄 떨어지고 끝나요
              </p>
              <p className="text-[14px] leading-relaxed break-keep">
                <span className="text-muted-foreground">github.com/me/toy.</span>{" "}
                <span className="text-destructive font-semibold">
                  뭘 하는 건지 안 보여요.
                </span>
              </p>
            </figcaption>
          </figure>
          <figure
            data-stagger
            className="flex flex-col items-center gap-4 text-center"
          >
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
        </div>
      </StaggerReveal>
    </section>
  )
}

function AppealCardDevice({ project }: { project: SampleProject }) {
  const rows = [
    { hint: "왜", text: project.problem },
    { hint: "뭘", text: project.action },
    { hint: "얼마나", text: project.metric },
  ]

  return (
    <div className="bg-muted relative flex aspect-4/3 w-full max-w-sm items-center justify-center overflow-hidden rounded-[28px]">
      <div
        aria-hidden="true"
        className="bg-primary/12 absolute -top-8 -right-10 size-44 rounded-full"
      />
      <div className="relative w-[76%] rotate-[-5deg]">
        <div className="rounded-[30px] bg-foreground/90 p-1.5 shadow-[0_22px_44px_rgb(42_36_56/0.28)]">
          <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-white/25" />
          <article className="bg-card overflow-hidden rounded-[24px]">
            <div className="bg-muted relative h-20">
              <Image
                src={project.imageSrc}
                alt=""
                fill
                sizes="280px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-2 p-3">
              <h3 className="text-[15px] font-bold tracking-tight break-keep">
                {project.name}
              </h3>
              <ul className="flex flex-col gap-1">
                {rows.map((row) => (
                  <li key={row.hint} className="flex items-center gap-1.5">
                    <span className="bg-secondary text-secondary-foreground inline-flex shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold">
                      {row.hint}
                    </span>
                    <p className="min-w-0 truncate text-left text-[12px] leading-snug">
                      {row.text}
                    </p>
                  </li>
                ))}
              </ul>
              <div
                aria-hidden="true"
                className="bg-primary text-primary-foreground flex h-8 items-center justify-center rounded-lg text-[12px] font-semibold"
              >
                써 보기
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
