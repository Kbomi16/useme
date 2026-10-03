export const uploadProjectCover = async (slug: string, file: File) => {
  const body = new FormData()
  body.append("file", file)

  const response = await fetch(
    `/api/projects/${encodeURIComponent(slug)}/cover`,
    { method: "POST", body },
  )
  const payload = (await response.json().catch(() => null)) as {
    message?: string
  } | null

  if (!response.ok) {
    throw new Error(payload?.message ?? "이미지를 올리지 못했어요.")
  }
}
