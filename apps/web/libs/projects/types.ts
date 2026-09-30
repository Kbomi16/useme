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
}

export type SavedProject = UploadValues & {
  slug: string
}

export const projectColumns =
  "slug, name, tagline, url, problem, action, metric, body"

export const toSavedProject = (row: ProjectRow): SavedProject => ({
  slug: row.slug,
  name: row.name,
  tagline: row.tagline,
  url: row.url,
  problem: row.problem,
  action: row.action,
  metric: row.metric,
  body: row.body,
})
