const BLOG_PROJECT_PREFIX = "blog/"

/**
 * Portfolio cards stay in /projects, but toy-project detail cards point at the
 * corresponding long-form build note when that note exists in /blog/projects.
 */
export function projectDetailSlug(
  projectSlug: string,
  category: unknown,
  availableSlugs: ReadonlySet<string>,
): string {
  if (category !== "toy") return projectSlug

  const buildNoteSlug = `${BLOG_PROJECT_PREFIX}${projectSlug}`
  return availableSlugs.has(buildNoteSlug) ? buildNoteSlug : projectSlug
}
