import { fromAsync } from 'from-async'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers({
    shouldAdvanceTime: true,
    advanceTimeDelta: 20,
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('iterable', async () => {
  function* iterable(): Generator<string | undefined> {
    for (let i = 0; ; i++) {
      const char = 'abc'.at(i)

      if (!char) break

      yield char
    }
  }

  const startTime = Date.now()

  expect(await fromAsync(iterable())).toEqual(['a', 'b', 'c'])

  expect(Date.now() - startTime).toBe(0)
})

test('async iterable', async () => {
  async function* asyncIterable(): AsyncGenerator<string | undefined> {
    for (let i = 0; ; i++) {
      await new Promise((resolve) => setTimeout(resolve, 10))

      const char = 'abc'.at(i)

      if (!char) break

      yield char
    }
  }

  const startTime = Date.now()

  expect(await fromAsync(asyncIterable())).toEqual(['a', 'b', 'c'])

  expect(Date.now() - startTime).toBe(80)
})

test('array-like object', async () => {
  const arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
  }

  const startTime = Date.now()

  expect(await fromAsync(arrayLike)).toEqual(['a', 'b', 'c'])

  expect(Date.now() - startTime).toBe(0)
})
