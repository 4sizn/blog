const BLOG_PROJECT_PREFIX = "blog/"

/**
 * A project card may live in `content/projects` or, when its only public detail
 * page is the long-form post, directly in `content/blog/projects`.
 */
export function isProjectCardSlug(slug: string, projectCard: unknown): boolean {
  return (
    (slug.startsWith("projects/") && slug !== "projects/index") ||
    (slug.startsWith(BLOG_PROJECT_PREFIX) && projectCard === true)
  )
}

/**
 * Cards stored under `content/blog/projects` already point at their public
 * long-form record. Portfolio-source cards use a matching blog record when it
 * exists, otherwise retain their own portfolio route.
 */
export function projectDetailSlug(
  projectSlug: string,
  _category: unknown,
  availableSlugs: ReadonlySet<string>,
  preferredDetailSlug?: unknown,
): string {
  if (projectSlug.startsWith(BLOG_PROJECT_PREFIX)) return projectSlug

  if (typeof preferredDetailSlug === "string" && availableSlugs.has(preferredDetailSlug)) {
    return preferredDetailSlug
  }

  const buildNoteSlug = `${BLOG_PROJECT_PREFIX}${projectSlug}`
  return availableSlugs.has(buildNoteSlug) ? buildNoteSlug : projectSlug
}
