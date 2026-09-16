import AppealCard from "./AppealCard"
import Reveal from "./Reveal"
import { sampleProjects } from "./sampleProjects"

export default function LandingSamples() {
  return (
    <section id="sample-cards" className="py-16 sm:py-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6">
        <Reveal className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <h2 className="text-[28px] leading-snug font-bold tracking-tight break-keep sm:text-[34px]">
            이런 카드가 나가요
          </h2>
          <p className="text-muted-foreground text-[17px] leading-relaxed break-keep">
            왜, 뭘, 얼마나를 한 장에 담은 예시예요.
          </p>
        </Reveal>
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08}>
              <AppealCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
