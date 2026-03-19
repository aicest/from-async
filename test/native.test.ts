import { fromAsync } from 'from-async'
import { expect, test } from 'vitest'

function project<T>(value: T, index: number) {
  if (index === 0) return value
  if (index === 1) return Promise.resolve(value)
  return new Promise<T>((resolve) => setTimeout(() => resolve(value)))
}

test('native', async () => {
  const iterable = {
    *[Symbol.iterator]() {
      yield 'a'
      yield 'b'
      yield Promise.resolve('c')
    },
  }

  expect(await Array.fromAsync(iterable)).toEqual(['a', 'b', 'c'])

  expect(await fromAsync(iterable)).toEqual(['a', 'b', 'c'])

  expect(await Array.fromAsync(iterable, project)).toEqual(['a', 'b', 'c'])

  expect(await fromAsync(iterable, project)).toEqual(['a', 'b', 'c'])
})
