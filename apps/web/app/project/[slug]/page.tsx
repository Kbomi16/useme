import { notFound } from "next/navigation"

import AppealCard from "../../_components/AppealCard"
import {
  getSampleProject,
  sampleProjects,
} from "../../_components/sampleProjects"
import DiscoverCommentList from "../../discover/_components/DiscoverCommentList"
import DiscoverTryButton from "../../discover/_components/DiscoverTryButton"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () =>
  sampleProjects.map((project) => ({ slug: project.slug }))

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getSampleProject(slug)

  if (!project) notFound()

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto w-full max-w-md">
        <AppealCard project={project}>
          <DiscoverCommentList comments={project.comments} />
          <DiscoverTryButton className="w-full" />
        </AppealCard>
      </div>
    </main>
  )
}
