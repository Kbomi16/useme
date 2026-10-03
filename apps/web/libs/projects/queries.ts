import { createClient } from "@/libs/supabase/server"

import { decodeProjectSlug } from "./slug"
import {
  projectColumns,
  toSavedProject,
  type ProjectRow,
  type SavedProject,
} from "./types"

export const listMyProjects = async (): Promise<
  Pick<SavedProject, "slug" | "name" | "tagline" | "coverPath" | "updatedAt">[]
> => {
  const supabase = await createClient()

  if (!supabase) return []

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data } = await supabase
    .from("projects")
    .select("slug, name, tagline, cover_path, updated_at")
    .eq("author_id", user.id)
    .order("updated_at", { ascending: false })
    .returns<
      Pick<ProjectRow, "slug" | "name" | "tagline" | "cover_path" | "updated_at">[]
    >()

  return (data ?? []).map((row) => ({
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    coverPath: row.cover_path,
    updatedAt: row.updated_at,
  }))
}

export const listPublishedProjects = async (): Promise<SavedProject[]> => {
  const supabase = await createClient()

  if (!supabase) return []

  const { data } = await supabase
    .from("projects")
    .select(projectColumns)
    .order("updated_at", { ascending: false })
    .limit(24)
    .returns<ProjectRow[]>()

  return (data ?? []).map(toSavedProject)
}

export const getPublicProject = async (
  slug: string,
): Promise<SavedProject | null> => {
  const decodedSlug = decodeProjectSlug(slug)
  const supabase = await createClient()

  if (!supabase) return null

  const { data, error } = await supabase
    .from("projects")
    .select(projectColumns)
    .eq("slug", decodedSlug)
    .maybeSingle<ProjectRow>()

  if (error || !data) return null

  return toSavedProject(data)
}

export const getOwnedProject = async (
  slug: string,
): Promise<SavedProject | null> => {
  const decodedSlug = decodeProjectSlug(slug)
  const supabase = await createClient()

  if (!supabase) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from("projects")
    .select(projectColumns)
    .eq("slug", decodedSlug)
    .eq("author_id", user.id)
    .maybeSingle<ProjectRow>()

  if (error || !data) return null

  return toSavedProject(data)
}
