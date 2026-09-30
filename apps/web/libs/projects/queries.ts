import { createClient } from "@/libs/supabase/server"

import { decodeProjectSlug } from "./slug"
import {
  projectColumns,
  toSavedProject,
  type ProjectRow,
  type SavedProject,
} from "./types"

export const listMyProjects = async (): Promise<
  Pick<SavedProject, "slug" | "name" | "tagline">[]
> => {
  const supabase = await createClient()

  if (!supabase) return []

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data } = await supabase
    .from("projects")
    .select("slug, name, tagline")
    .eq("author_id", user.id)
    .order("updated_at", { ascending: false })
    .returns<Pick<SavedProject, "slug" | "name" | "tagline">[]>()

  return data ?? []
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
