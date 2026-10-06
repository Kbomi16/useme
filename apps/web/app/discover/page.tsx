import { getProjectCoverUrl } from "@/libs/projects/covers"
import { listPublishedProjects } from "@/libs/projects/queries"

import {
  featuredProject,
  shelfProjects,
} from "../_components/sampleProjects"
import DiscoverBrowse, {
  type BrowseProject,
} from "./_components/DiscoverBrowse"

export default async function DiscoverPage() {
  const published = await listPublishedProjects()
  const sampleSlugs = new Set([
    featuredProject.slug,
    ...shelfProjects.map((project) => project.slug),
  ])
  const uploaded: BrowseProject[] = published
    .filter((project) => !sampleSlugs.has(project.slug))
    .map((project) => ({
      slug: project.slug,
      name: project.name,
      tagline: project.tagline,
      problem: project.problem,
      action: project.action,
      metric: project.metric,
      imageSrc: getProjectCoverUrl(project.coverPath, project.updatedAt) ?? "",
    }))

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 md:px-6 md:py-16">
      <DiscoverBrowse
        featured={featuredProject}
        shelf={[...uploaded, ...shelfProjects]}
      />
    </main>
  )
}
