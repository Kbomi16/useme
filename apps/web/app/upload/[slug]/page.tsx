import { notFound, redirect } from "next/navigation"

import UploadForm from "../_components/UploadForm"
import { getAuthUser } from "@/libs/auth/getAuthUser"
import { getProjectCoverUrl } from "@/libs/projects/covers"
import { getOwnedProject } from "@/libs/projects/queries"

type EditProjectPageProps = {
  params: Promise<{ slug: string }>
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { slug } = await params
  const user = await getAuthUser()

  if (!user) {
    redirect(`/login?next=/upload/${encodeURIComponent(slug)}`)
  }

  const project = await getOwnedProject(slug)

  if (!project) notFound()

  const { slug: projectSlug, coverPath, updatedAt, ...initialValues } = project

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12 md:px-6 md:py-16">
      <div className="flex max-w-xl flex-col gap-2">
        <p className="text-sm font-semibold text-primary">수정</p>
        <h1 className="text-[28px]/snug font-bold tracking-tight break-keep sm:text-[34px]/snug">
          {project.name}
        </h1>
        <p className="text-[17px]/relaxed break-keep text-muted-foreground">
          바꾼 내용은 등록된 카드에 바로 반영돼요.
        </p>
      </div>
      <UploadForm
        mode="edit"
        projectSlug={projectSlug}
        initialValues={initialValues}
        coverUrl={getProjectCoverUrl(coverPath, updatedAt)}
      />
    </main>
  )
}
