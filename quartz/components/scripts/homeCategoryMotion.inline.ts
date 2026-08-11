import {
  initializeCategoryMotion,
  type MotionEntry,
  type MotionObserver,
} from "./homeCategoryMotion"

let cleanup: (() => void) | undefined

function setupCategoryMotion() {
  cleanup?.()

  const root = document.querySelector(".home-category-thumbnails")
  if (!root) {
    delete document.documentElement.dataset.homeMotion
    return
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document.documentElement.dataset.homeMotion = prefersReducedMotion ? "reduced" : "ready"

  cleanup = initializeCategoryMotion({
    root,
    prefersReducedMotion,
    createObserver: (onEntries) =>
      new IntersectionObserver((entries) => onEntries(entries as unknown as MotionEntry[]), {
        threshold: 0.05,
        rootMargin: "0px 0px -8% 0px",
      }) as unknown as MotionObserver,
  })

  window.addCleanup?.(() => {
    cleanup?.()
    cleanup = undefined
    delete document.documentElement.dataset.homeMotion
  })
}

document.addEventListener("nav", setupCategoryMotion)

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupCategoryMotion, { once: true })
} else {
  setupCategoryMotion()
}
