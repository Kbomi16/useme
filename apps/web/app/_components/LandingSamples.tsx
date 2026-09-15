import AppealCard from "./AppealCard"
import { sampleProjects } from "./sampleProjects"

export default function LandingSamples() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight break-keep">
          어필 카드는 이렇게 보여요.
        </h2>
        <p className="text-muted-foreground max-w-xl text-sm leading-relaxed break-keep">
          문제 / 한 일 / 숫자 세 칸이 보여야, 왜 쓰는지가 한 눈에 들어와요.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleProjects.map((project) => (
          <AppealCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
