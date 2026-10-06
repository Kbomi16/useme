import { getSupabaseEnv } from "@/libs/supabase/env"

export const PROJECT_COVERS_BUCKET = "project-covers"
export const COVER_MAX_BYTES = 5 * 1024 * 1024
export const COVER_ACCEPT = "image/jpeg,image/png,image/webp"

const mimeToExt = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const

export type CoverMime = keyof typeof mimeToExt

export const isCoverMime = (value: string): value is CoverMime =>
  Object.prototype.hasOwnProperty.call(mimeToExt, value)

export const toCoverPath = (userId: string, projectId: string, mime: CoverMime) =>
  `${userId}/${projectId}.${mimeToExt[mime]}`

export const toBodyImagePath = (
  userId: string,
  fileId: string,
  mime: CoverMime,
) => `${userId}/body/${fileId}.${mimeToExt[mime]}`

export const getStoragePublicUrl = (bucket: string, objectPath: string) => {
  const env = getSupabaseEnv()

  if (!env || !objectPath) return null

  const encoded = objectPath.split("/").map(encodeURIComponent).join("/")

  return `${env.url}/storage/v1/object/public/${bucket}/${encoded}`
}

export const getProjectCoverUrl = (
  coverPath: string | null,
  updatedAt?: string | null,
) => {
  if (!coverPath) return null

  const url = getStoragePublicUrl(PROJECT_COVERS_BUCKET, coverPath)

  if (!url) return null

  return updatedAt ? `${url}?v=${encodeURIComponent(updatedAt)}` : url
}
