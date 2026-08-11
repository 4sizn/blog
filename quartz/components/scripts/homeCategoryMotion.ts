export const CATEGORY_BLOCK_SELECTOR = ".home-category-block[data-motion='category']"

export type MotionElement = {
  classList: {
    add: (name: string) => void
  }
}

export type MotionEntry = {
  isIntersecting: boolean
  target: MotionElement
}

export type MotionObserver = {
  observe: (target: MotionElement) => void
  unobserve: (target: MotionElement) => void
  disconnect: () => void
}

type MotionRoot = {
  querySelectorAll: (selector: string) => Iterable<MotionElement>
}

type CategoryMotionOptions = {
  root: MotionRoot
  prefersReducedMotion: boolean
  createObserver: (callback: (entries: MotionEntry[]) => void) => MotionObserver
}

export function initializeCategoryMotion({
  root,
  prefersReducedMotion,
  createObserver,
}: CategoryMotionOptions): () => void {
  const blocks = Array.from(root.querySelectorAll(CATEGORY_BLOCK_SELECTOR))

  if (prefersReducedMotion) {
    blocks.forEach((block) => block.classList.add("is-revealed"))
    return () => {}
  }

  blocks.forEach((block) => block.classList.add("is-motion-pending"))

  const observer = createObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add("is-revealed")
      observer.unobserve(entry.target)
    })
  })

  blocks.forEach((block) => observer.observe(block))
  return () => observer.disconnect()
}
