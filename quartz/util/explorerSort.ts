import { FileTrieNode } from "./fileTrie"

/**
 * Explorer's browser-side comparator. Keep it self-contained: Quartz serializes
 * it with toString() and executes it against the content index on the client.
 */
export const explorerSortFn = (a: FileTrieNode, b: FileTrieNode) => {
  const order: Record<string, number> = { log: 0, dev: 1, releases: 2, projects: 3 }
  if (a.isFolder && !b.isFolder) return -1
  if (!a.isFolder && b.isFolder) return 1
  if (a.isFolder && b.isFolder) {
    const oa = order[a.slugSegment] ?? 99
    const ob = order[b.slugSegment] ?? 99
    if (oa !== ob) return oa - ob
    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }

  // Keep this comparator self-contained: Explorer serializes it with toString()
  // and executes it against the client-side content index.
  const da = a.data?.published ?? a.data?.created ?? a.data?.modified ?? a.data?.date
  const db = b.data?.published ?? b.data?.created ?? b.data?.modified ?? b.data?.date
  const daTime = da ? new Date(da).getTime() : 0
  const dbTime = db ? new Date(db).getTime() : 0
  if (daTime !== dbTime) return dbTime - daTime
  return a.displayName.localeCompare(b.displayName, undefined, {
    numeric: true,
    sensitivity: "base",
  })
}
