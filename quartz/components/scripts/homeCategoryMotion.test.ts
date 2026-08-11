import assert from "node:assert/strict"
import test from "node:test"

import {
  CATEGORY_BLOCK_SELECTOR,
  initializeCategoryMotion,
  type MotionEntry,
  type MotionObserver,
} from "./homeCategoryMotion"

type Block = {
  classList: {
    values: Set<string>
    add: (name: string) => void
  }
}

function createBlock(): Block {
  const values = new Set<string>()
  return { classList: { values, add: (name) => values.add(name) } }
}

test("reduced motion reveals every category without constructing an observer", () => {
  const blocks = [createBlock(), createBlock()]
  let observerCreated = false

  const cleanup = initializeCategoryMotion({
    root: {
      querySelectorAll: (selector) => {
        assert.equal(selector, CATEGORY_BLOCK_SELECTOR)
        return blocks
      },
    },
    prefersReducedMotion: true,
    createObserver: () => {
      observerCreated = true
      throw new Error("reduced motion must not create an observer")
    },
  })

  assert.deepEqual(
    blocks.map((block) => block.classList.values.has("is-revealed")),
    [true, true],
  )
  assert.equal(observerCreated, false)
  cleanup()
})

test("viewport entry reveals only the entered category and releases its observer", () => {
  const blocks = [createBlock(), createBlock()]
  let callback: ((entries: MotionEntry[]) => void) | undefined
  const observed: Block[] = []
  const unobserved: Block[] = []
  let disconnected = false

  const observer: MotionObserver = {
    observe: (block) => observed.push(block as Block),
    unobserve: (block) => unobserved.push(block as Block),
    disconnect: () => {
      disconnected = true
    },
  }

  const cleanup = initializeCategoryMotion({
    root: { querySelectorAll: () => blocks },
    prefersReducedMotion: false,
    createObserver: (next) => {
      callback = next
      return observer
    },
  })

  assert.deepEqual(observed, blocks)
  assert.ok(callback)
  callback([
    { isIntersecting: false, target: blocks[0] },
    { isIntersecting: true, target: blocks[1] },
  ])
  assert.equal(blocks[0].classList.values.has("is-revealed"), false)
  assert.equal(blocks[1].classList.values.has("is-revealed"), true)
  assert.deepEqual(unobserved, [blocks[1]])

  cleanup()
  assert.equal(disconnected, true)
})
