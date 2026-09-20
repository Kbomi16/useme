import AppealCard from "../../../_components/AppealCard"
import type { SampleProject } from "../../../_components/sampleProjects"
import DiscoverProjectActions from "../../../discover/_components/DiscoverProjectActions"

type ProjectRelatedProps = {
  projects: SampleProject[]
}

export default function ProjectRelated({ projects }: ProjectRelatedProps) {
  if (projects.length === 0) return null

  return (
    <section className="flex flex-col gap-4" aria-labelledby="project-related">
      <h2
        id="project-related"
        className="scroll-mt-24 text-lg font-bold tracking-tight break-keep"
      >
        비슷한 카드
      </h2>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <AppealCard project={project}>
              <DiscoverProjectActions slug={project.slug} />
            </AppealCard>
          </li>
        ))}
      </ul>
    </section>
  )
}
