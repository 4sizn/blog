import style from "./styles/contributionGraph.scss"
// @ts-ignore
import script from "./scripts/contributionGraph.inline"
import contributions from "../static/contributions.json"
import type { QuartzComponent, QuartzComponentConstructor } from "./types"

type Day = { d: string; c: number; l: number }
type Year = { year: number; total: number; days: Day[] }

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const years = (contributions.years ?? []) as Year[]

/**
 * 하루 한 칸을 세로 7칸(일~토) 열로 쌓는다. 1월 1일이 무슨 요일인지에 따라
 * 첫 열이 중간부터 시작하므로 그만큼 앞을 비운다.
 */
function toCells(days: Day[]) {
  if (days.length === 0) return { cells: [], offset: 0 }
  const offset = new Date(`${days[0].d}T00:00:00Z`).getUTCDay()
  return { cells: days, offset }
}

/** 각 달이 처음 나타나는 열 번호. 월 레이블을 그 열에 맞춰 세운다. */
function monthColumns(days: Day[], offset: number) {
  const seen = new Map<number, number>()
  days.forEach((day, i) => {
    const month = Number(day.d.slice(5, 7)) - 1
    if (!seen.has(month)) {
      seen.set(month, Math.floor((i + offset) / 7) + 1)
    }
  })
  return [...seen.entries()].map(([month, column]) => ({ month, column }))
}

function YearPanel({ data, active }: { data: Year; active: boolean }) {
  const { cells, offset } = toCells(data.days)
  const columns = monthColumns(data.days, offset)
  // 윤년이나 1월 1일이 주 중간에 걸리면 53주를 넘길 수 있어 매번 계산한다.
  // 월 레이블 줄도 같은 열 수를 써야 칸과 어긋나지 않는다.
  const weeks = Math.ceil((cells.length + offset) / 7)

  return (
    <div class="contribution-panel" data-year={data.year} data-active={active ? "true" : "false"}>
      <div class="contribution-months" style={`--weeks: ${weeks}`}>
        {columns.map(({ month, column }) => (
          <span style={`grid-column: ${column}`}>{MONTHS[month]}</span>
        ))}
      </div>

      <div class="contribution-grid" style={`--weeks: ${weeks}`}>
        {Array.from({ length: offset }, () => (
          <div class="contribution-day is-empty" />
        ))}
        {cells.map((day) => (
          <div
            class="contribution-day"
            data-level={day.l}
            title={`${day.c} contributions on ${day.d}`}
          />
        ))}
      </div>

      <div class="contribution-meta">
        <span>
          {data.total.toLocaleString()} contributions in {data.year}
        </span>
        <span class="contribution-legend">
          Less
          <i data-level="0" />
          <i data-level="1" />
          <i data-level="2" />
          <i data-level="3" />
          <i data-level="4" />
          More
        </span>
      </div>
    </div>
  )
}

const ContributionGraph: QuartzComponent = () => {
  if (years.length === 0) {
    return null
  }

  return (
    <section class="contribution-graph">
      <h2>Contribution Graph</h2>

      <div class="contribution-layout">
        <div class="contribution-panels">
          {years.map((year, i) => (
            <YearPanel data={year} active={i === 0} />
          ))}
        </div>

        <div class="contribution-years" role="tablist">
          {years.map((year, i) => (
            <button
              type="button"
              class={`contribution-year${i === 0 ? " active" : ""}`}
              data-year={year.year}
              role="tab"
              aria-selected={i === 0 ? "true" : "false"}
            >
              {year.year}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

ContributionGraph.css = style
ContributionGraph.afterDOMLoaded = script

export default (() => ContributionGraph) satisfies QuartzComponentConstructor
