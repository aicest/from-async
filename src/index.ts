export async function fromAsync<T>(
  iterator: AsyncIterable<T> | Iterable<T> | ArrayLike<T>
) {
  if ('length' in iterator) {
    return Array.from(iterator)
  }

  const array: T[] = []

  for await (const item of iterator) {
    array.push(item)
  }

  return array
}
