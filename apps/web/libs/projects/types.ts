import type { UploadValues } from "@/app/upload/_components/uploadSchema"

export type ProjectRow = {
  slug: string
  name: string
  tagline: string
  url: string
  problem: string
  action: string
  metric: string
  body: string
  cover_path: string | null
  updated_at: string
}

export type SavedProject = UploadValues & {
  slug: string
  coverPath: string | null
  updatedAt: string
}

export type PublishedProject = SavedProject

export const projectColumns =
  "slug, name, tagline, url, problem, action, metric, body, cover_path, updated_at"

export const toSavedProject = (row: ProjectRow): SavedProject => ({
  slug: row.slug,
  name: row.name,
  tagline: row.tagline,
  url: row.url,
  problem: row.problem,
  action: row.action,
  metric: row.metric,
  body: row.body,
  coverPath: row.cover_path,
  updatedAt: row.updated_at,
})
