// 연도 탭 전환. 모든 연도가 이미 서버에서 렌더돼 있으므로 표시만 바꾼다.
document.addEventListener("nav", () => {
  const graph = document.querySelector<HTMLElement>(".contribution-graph")
  if (!graph) return

  const buttons = graph.querySelectorAll<HTMLButtonElement>(".contribution-year")
  const panels = graph.querySelectorAll<HTMLElement>(".contribution-panel")

  function activate(year: string) {
    buttons.forEach((button) => {
      const selected = button.dataset.year === year
      button.classList.toggle("active", selected)
      button.setAttribute("aria-selected", String(selected))
    })
    panels.forEach((panel) => {
      panel.dataset.active = String(panel.dataset.year === year)
    })
  }

  buttons.forEach((button) => {
    const onClick = () => activate(button.dataset.year ?? "")
    button.addEventListener("click", onClick)
    window.addCleanup(() => button.removeEventListener("click", onClick))
  })
})
