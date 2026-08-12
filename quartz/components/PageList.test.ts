import test from "node:test"
import assert from "node:assert/strict"
import { byLatestPostDate } from "./PageList"

const cfg = { defaultDateType: "modified" } as any

function post(
  slug: string,
  dates: { created: string; modified: string; published?: string },
  frontmatter: Record<string, string> = {},
) {
  return {
    slug,
    frontmatter: { title: slug, ...frontmatter },
    dates: {
      created: new Date(dates.created),
      modified: new Date(dates.modified),
      published: dates.published ? new Date(dates.published) : undefined,
    },
  } as any
}

test("post lists sort by publication chronology before shared migration modified dates", () => {
  const oldest = post(
    "oldest",
    { created: "2026-02-03", modified: "2026-08-11" },
    { created: "2026-02-03" },
  )
  const newest = post(
    "newest",
    { created: "2026-08-11", modified: "2026-08-11" },
    { created: "2026-08-11" },
  )

  assert.deepEqual(
    [oldest, newest].sort(byLatestPostDate(cfg)).map((item) => item.slug),
    ["newest", "oldest"],
  )
})

test("an explicit published date takes priority for post chronology", () => {
  const createdLater = post(
    "created-later",
    { created: "2026-08-11", modified: "2026-08-11" },
    { created: "2026-08-11" },
  )
  const publishedLater = post(
    "published-later",
    {
      created: "2026-02-03",
      published: "2026-08-12",
      modified: "2026-08-11",
    },
    { created: "2026-02-03", published: "2026-08-12" },
  )

  assert.deepEqual(
    [createdLater, publishedLater].sort(byLatestPostDate(cfg)).map((item) => item.slug),
    ["published-later", "created-later"],
  )
})
