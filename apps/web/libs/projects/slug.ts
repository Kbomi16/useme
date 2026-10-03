export const decodeProjectSlug = (slug: string) => {
  try {
    return decodeURIComponent(slug)
  } catch {
    return slug
  }
}

export const toProjectSlug = (name: string) => {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40)

  return slug || `card-${crypto.randomUUID().slice(0, 8)}`
}
