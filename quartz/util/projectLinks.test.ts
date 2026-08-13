import test from "node:test"
import assert from "node:assert/strict"
import { isProjectCardSlug, projectDetailSlug } from "./projectLinks"

const availableSlugs = new Set([
  "projects/lonely-candle",
  "blog/projects/lonely-candle",
  "blog/dev/lonely-candle",
  "projects/remote-meeting",
  "blog/projects/remote-meeting",
  "blog/dev/screen-saver-extension",
])

test("toy portfolio cards use their matching blog build note by default", () => {
  assert.equal(
    projectDetailSlug("projects/lonely-candle", "toy", availableSlugs),
    "blog/projects/lonely-candle",
  )
})

test("a card can explicitly point to its approved development story", () => {
  assert.equal(
    projectDetailSlug("projects/lonely-candle", "toy", availableSlugs, "blog/dev/lonely-candle"),
    "blog/dev/lonely-candle",
  )
})

test("career portfolio cards use their matching blog project record", () => {
  assert.equal(
    projectDetailSlug("projects/remote-meeting", "career", availableSlugs),
    "blog/projects/remote-meeting",
  )
})

test("toy cards fall back to their portfolio route when no build note exists", () => {
  assert.equal(
    projectDetailSlug("projects/unpublished", "toy", availableSlugs),
    "projects/unpublished",
  )
})

test("a card can explicitly point to its approved developer story", () => {
  assert.equal(
    projectDetailSlug(
      "projects/screen-saver-extension",
      "toy",
      availableSlugs,
      "blog/dev/screen-saver-extension",
    ),
    "blog/dev/screen-saver-extension",
  )
})

test("a blog project record can supply a portfolio card without a duplicate card page", () => {
  assert.equal(isProjectCardSlug("blog/projects/garden-eel-cove", true), true)
  assert.equal(isProjectCardSlug("blog/projects/garden-eel-cove", false), false)
  assert.equal(isProjectCardSlug("projects/index", true), false)
  assert.equal(
    projectDetailSlug("blog/projects/garden-eel-cove", "toy", availableSlugs),
    "blog/projects/garden-eel-cove",
  )
})
