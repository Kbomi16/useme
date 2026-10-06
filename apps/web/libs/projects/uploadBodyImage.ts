export const uploadBodyImage = async (file: File) => {
  const body = new FormData()
  body.append("file", file)

  const response = await fetch("/api/projects/body-images", {
    method: "POST",
    body,
  })
  const payload = (await response.json().catch(() => null)) as {
    url?: string
    message?: string
  } | null

  if (!response.ok || !payload?.url) {
    throw new Error(payload?.message ?? "이미지를 올리지 못했어요.")
  }

  return payload.url
}
