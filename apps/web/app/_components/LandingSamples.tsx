import AppealCard from "./AppealCard"
import StaggerReveal from "./StaggerReveal"
import { landingProjects } from "./sampleProjects"

export default function LandingSamples() {
  return (
    <section id="sample-cards" className="py-16 sm:py-24">
      <StaggerReveal className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6">
        <div
          data-stagger
          className="flex max-w-2xl flex-col items-center gap-3 text-center"
        >
          <h2 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
            이런 카드가 나가요
          </h2>
          <p className="text-[17px]/relaxed break-keep text-muted-foreground">
            왜, 뭘, 얼마나를 한 장에 담은 예시예요.
          </p>
        </div>
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {landingProjects.map((project) => (
            <div key={project.name} data-stagger>
              <AppealCard project={project} />
            </div>
          ))}
        </div>
      </StaggerReveal>
    </section>
  )
}
