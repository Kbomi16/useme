import { notFound } from "next/navigation"

import {
  getRelatedProjects,
  getSampleProject,
  sampleProjects,
} from "../../_components/sampleProjects"
import ProjectAuthor from "./_components/ProjectAuthor"
import ProjectComments from "./_components/ProjectComments"
import ProjectDetail from "./_components/ProjectDetail"
import ProjectRelated from "./_components/ProjectRelated"
import ProjectToc from "./_components/ProjectToc"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () =>
  sampleProjects.map((project) => ({ slug: project.slug }))

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getSampleProject(slug)

  if (!project) notFound()

  const related = getRelatedProjects(slug)

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <ProjectToc />
        <div className="flex min-w-0 flex-1 flex-col gap-12">
          <ProjectDetail project={project} />
          <ProjectAuthor author={project.author} />
          <ProjectComments key={project.slug} comments={project.comments} />
        </div>
      </div>
      <ProjectRelated projects={related} />
    </main>
  )
}
