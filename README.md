# from-async

[![NPM Version](https://img.shields.io/npm/v/from-async)](https://www.npmjs.com/package/from-async)
[![Codecov](https://img.shields.io/codecov/c/github/aicest/from-async?token=GQC7YN4VN2)](https://app.codecov.io/github/aicest/from-async)

A minimal alternative to [`Array.fromAsync`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync) for converting async iterables, sync iterables, or array-like objects to arrays. Prefer the native `Array.fromAsync` if available.

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

### `function fromAsync<T>(input: AsyncIterable<T> | Iterable<T> | ArrayLike<T>): Promise<T[]>`

- Accepts: Any async iterable, sync iterable, or array-like object.
- Returns: A promise that resolves to an array containing all items from the input, in order.

## License

MIT
