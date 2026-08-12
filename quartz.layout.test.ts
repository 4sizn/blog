import test from "node:test"
import assert from "node:assert/strict"
import { explorerSortFn } from "./quartz/util/explorerSort"

function post(title: string, date: string) {
  return { isFolder: false, displayName: title, data: { created: date } } as any
}

test("Explorer puts newer posts before older posts from the same folder", () => {
  const newest = post("newest", "2026-08-11")
  const oldest = post("oldest", "2026-02-03")

  assert.deepEqual(
    [oldest, newest].sort(explorerSortFn).map((node) => node.displayName),
    ["newest", "oldest"],
  )
})

test("Explorer keeps folders before their chronologically ordered posts", () => {
  const folder = { isFolder: true, slugSegment: "releases", displayName: "releases" } as any
  const postNode = post("latest release", "2026-08-11")

  assert.deepEqual(
    [postNode, folder].sort(explorerSortFn).map((node) => node.displayName),
    ["releases", "latest release"],
  )
})
