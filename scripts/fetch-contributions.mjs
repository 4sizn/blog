#!/usr/bin/env node
/**
 * GitHub 기여 그래프(잔디) 데이터를 받아 quartz/static/contributions.json 으로 저장한다.
 *
 * 홈의 ContributionGraph 컴포넌트가 이 파일을 읽는다. 빌드 시점에 한 번 받아 두면
 * 배포된 페이지는 외부 API 없이 동작한다 — 서비스가 죽어도 이미 나간 사이트는 멀쩡하다.
 *
 * GitHub GraphQL의 contributionsCollection은 토큰을 요구하는데, 이 API는 요구하지 않는다.
 *
 * 사용법:
 *   node scripts/fetch-contributions.mjs
 *   node scripts/fetch-contributions.mjs --user 4sizn --years 5
 */

import { writeFile, readFile, mkdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = resolve(__dirname, "../quartz/static/contributions.json")
const API_BASE = "https://github-contributions-api.jogruber.de/v4"

function parseArgs(argv) {
  const args = { user: "4sizn", years: 5 }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--user" && argv[i + 1]) args.user = argv[++i]
    if (argv[i] === "--years" && argv[i + 1]) args.years = Number(argv[++i])
  }
  return args
}

async function fetchYear(user, year) {
  const res = await fetch(`${API_BASE}/${user}?y=${year}`)
  if (!res.ok) {
    throw new Error(`${year}: HTTP ${res.status}`)
  }

  const data = await res.json()
  const contributions = Array.isArray(data.contributions) ? data.contributions : []

  return {
    year,
    total: data.total?.[String(year)] ?? 0,
    // count는 툴팁에만 쓰고 칸 색은 level로 정한다. 날짜·레벨·개수만 남겨 파일을 줄인다.
    days: contributions.map((d) => ({ d: d.date, c: d.count, l: d.level })),
  }
}

async function main() {
  const { user, years } = parseArgs(process.argv.slice(2))
  const currentYear = new Date().getFullYear()
  const targetYears = Array.from({ length: years }, (_, i) => currentYear - i)

  console.log(`Fetching contributions for ${user}: ${targetYears.join(", ")}`)

  const results = await Promise.allSettled(targetYears.map((y) => fetchYear(user, y)))

  const fetched = []
  for (const [i, result] of results.entries()) {
    if (result.status === "fulfilled") {
      fetched.push(result.value)
      console.log(`  ${result.value.year}: ${result.value.total} contributions`)
    } else {
      console.warn(`  ${targetYears[i]}: failed — ${result.reason.message}`)
    }
  }

  if (fetched.length === 0) {
    // 네트워크가 끊겼다고 배포를 막지는 않는다. 기존 파일이 있으면 그대로 두고 끝낸다.
    try {
      await readFile(OUTPUT_PATH, "utf8")
      console.warn("No data fetched. Keeping the existing contributions.json.")
      return
    } catch {
      throw new Error("No data fetched and no existing contributions.json to fall back on.")
    }
  }

  const payload = {
    user,
    updatedAt: new Date().toISOString(),
    years: fetched.sort((a, b) => b.year - a.year),
  }

  await mkdir(dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, JSON.stringify(payload), "utf8")
  console.log(`Wrote ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
