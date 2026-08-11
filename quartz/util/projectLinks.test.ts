import test from "node:test"
import assert from "node:assert/strict"
import { projectDetailSlug } from "./projectLinks"

const availableSlugs = new Set([
  "projects/lonely-candle",
  "blog/projects/lonely-candle",
  "projects/remote-meeting",
  "blog/projects/remote-meeting",
])

test("toy portfolio cards use their matching blog build note", () => {
  assert.equal(
    projectDetailSlug("projects/lonely-candle", "toy", availableSlugs),
    "blog/projects/lonely-candle",
  )
})

test("career portfolio cards preserve their portfolio detail route", () => {
  assert.equal(
    projectDetailSlug("projects/remote-meeting", "career", availableSlugs),
    "projects/remote-meeting",
  )
})

test("toy cards fall back to their portfolio route when no build note exists", () => {
  assert.equal(
    projectDetailSlug("projects/unpublished", "toy", availableSlugs),
    "projects/unpublished",
  )
})

test("missing categories preserve the portfolio route", () => {
  assert.equal(
    projectDetailSlug("projects/lonely-candle", undefined, availableSlugs),
    "projects/lonely-candle",
  )
})
