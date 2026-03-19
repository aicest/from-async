export function fromAsync<T>(
  iterable: AsyncIterable<T> | Iterable<T> | ArrayLike<T>
): Promise<Awaited<T>[]>

export function fromAsync<T, U>(
  iterable: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
  project: (value: Awaited<T>, index: number) => U,
  thisArg?: unknown
): Promise<Awaited<U>[]>

export async function fromAsync<T, U>(
  iterable: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
  project?: (value: Awaited<T>, index: number) => U,
  thisArg?: unknown
): Promise<Awaited<U>[]> {
  if (project === undefined) {
    project = (value) => value as U
  }

  if (typeof Array.fromAsync === 'function') {
    return Array.fromAsync(iterable, project, thisArg)
  }

  const array: Awaited<U>[] = []

  for await (const item of toIterable(iterable)) {
    array.push(await project.call(thisArg, item, array.length))
  }

  return array
}

function toIterable<T>(
  iterable: AsyncIterable<T> | Iterable<T> | ArrayLike<T>
): AsyncIterable<T> | Iterable<T> {
  if (
    typeof iterable === 'object' &&
    iterable !== null &&
    !(Symbol.asyncIterator in iterable) &&
    !(Symbol.iterator in iterable) &&
    'length' in iterable
  ) {
    return Array.from(iterable)
  }

  return iterable
}
