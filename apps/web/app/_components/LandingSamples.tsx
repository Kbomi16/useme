import AppealCard from "./AppealCard"
import Reveal from "./Reveal"
import { sampleProjects } from "./sampleProjects"

export default function LandingSamples() {
  const rest = sampleProjects.slice(1)

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16 sm:py-20">
      <Reveal className="flex flex-col gap-3">
        <h2 className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[32px]">
          이런 카드가 나가요.
        </h2>
        <p className="text-muted-foreground max-w-xl text-[17px] leading-relaxed break-keep">
          아래 ‘써 보기’는 실제로 눌러보는 자리예요. 지금은 모양만 보여요.
        </p>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2">
        {rest.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.08}>
            <AppealCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
