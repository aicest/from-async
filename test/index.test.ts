import { fromAsync } from 'from-async'
import { beforeAll, beforeEach, expect, test, vi } from 'vitest'

beforeAll(() => {
  Object.defineProperty(Array, 'fromAsync', { value: undefined })
})

beforeEach(() => {
  vi.resetAllMocks()
  vi.useFakeTimers({
    shouldAdvanceTime: true,
    advanceTimeDelta: 20,
  })
})

function project<T>(value: T, index: number) {
  if (index === 0) return value
  if (index === 1) return Promise.resolve(value)
  return new Promise<T>((resolve) => setTimeout(() => resolve(value)))
}

test('iterable', async () => {
  function* gen(): Generator<string> {
    for (let i = 0; ; i++) {
      const char = 'abcd'.at(i)

      if (!char) break

      yield char
    }
  }

  const startTime = Date.now()

  expect(await fromAsync(gen())).toEqual(['a', 'b', 'c', 'd'])

  expect(Date.now() - startTime).toBe(0)

  expect(await fromAsync(gen(), project)).toEqual(['a', 'b', 'c', 'd'])

  expect(Date.now() - startTime).toBe(0 * 2 + 40)
})

test('async iterable', async () => {
  async function* asyncGen(): AsyncGenerator<string> {
    for (let i = 0; ; i++) {
      await new Promise((resolve) => setTimeout(resolve))

      const char = 'abcd'.at(i)

      if (!char) break

      yield char
    }
  }

  const startTime = Date.now()

  expect(await fromAsync(asyncGen())).toEqual(['a', 'b', 'c', 'd'])

  expect(Date.now() - startTime).toBe(100)

  expect(await fromAsync(asyncGen(), project)).toEqual(['a', 'b', 'c', 'd'])

  expect(Date.now() - startTime).toBe(100 * 2 + 40)
})

test('array-like object', async () => {
  const arrayLike = {
    0: 'a',
    1: Promise.resolve('b'),
    get 2() {
      return new Promise<string>((resolve) => setTimeout(() => resolve('c')))
    },
    get 3() {
      return Promise.resolve('d')
    },
    length: 4,
  }

  const startTime = Date.now()

  expect(await fromAsync(arrayLike)).toEqual(['a', 'b', 'c', 'd'])

  expect(Date.now() - startTime).toBe(20)

  expect(await fromAsync(arrayLike, project)).toEqual(['a', 'b', 'c', 'd'])

  expect(Date.now() - startTime).toBe(20 * 2 + 40)
})
