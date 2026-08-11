import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const stylesheet = readFileSync(new URL("./explorer.scss", import.meta.url), "utf8")

test("mobile Explorer drawer starts at the viewport edge before its off-canvas transform", () => {
  assert.match(
    stylesheet,
    /\.explorer-content\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?top:\s*0;[\s\S]*?left:\s*-1rem;/,
  )
})
