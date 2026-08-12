const BLOG_PROJECT_PREFIX = "blog/"

/**
 * Every portfolio card uses its matching long-form project record when one is
 * published under /blog/projects; otherwise it preserves the portfolio route.
 */
export function projectDetailSlug(
  projectSlug: string,
  _category: unknown,
  availableSlugs: ReadonlySet<string>,
): string {
  const buildNoteSlug = `${BLOG_PROJECT_PREFIX}${projectSlug}`
  return availableSlugs.has(buildNoteSlug) ? buildNoteSlug : projectSlug
}
