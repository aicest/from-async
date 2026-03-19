# from-async

[![NPM Version](https://img.shields.io/npm/v/from-async)](https://www.npmjs.com/package/from-async)
[![Codecov](https://img.shields.io/codecov/c/github/aicest/from-async?token=GQC7YN4VN2)](https://app.codecov.io/github/aicest/from-async)

A minimal ponyfill for [`Array.fromAsync`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync).
It converts async iterables, sync iterables, and array-like objects into arrays.
Prefer the native `Array.fromAsync` when available.

## Install

```sh
npm i from-async
# or
pnpm add from-async
# or
yarn add from-async
```

## Usage

```ts
import { fromAsync } from 'from-async'

async function* asyncGen() {
  yield 'a'
  yield 'b'
  yield 'c'
}

const array = await fromAsync(asyncGen())

console.log(array) // ['a', 'b', 'c']
```

## API

### `fromAsync(iterable)`

```ts
function fromAsync<T>(
  iterable: AsyncIterable<T> | Iterable<T> | ArrayLike<T>
): Promise<Awaited<T>[]>
```

- `iterable`: An async iterable, sync iterable, or array-like object.
- Returns: A promise that resolves to an array of values, preserving input order.

### `fromAsync(iterable, project, thisArg?)`

```ts
function fromAsync<T, U>(
  iterable: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
  project: (value: Awaited<T>, index: number) => U,
  thisArg?: unknown
): Promise<Awaited<U>[]>
```

- `iterable`: An async iterable, sync iterable, or array-like object.
- `project`: Called as `project(value, index)` for each item.
- `thisArg`: Optional `this` value used when calling `project`.
- Returns: A promise that resolves to an array of mapped values, preserving input order.

## License

MIT
