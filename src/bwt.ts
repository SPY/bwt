const enum Order {
  LT = -1,
  EQ = 0,
  GT = 1
}

type ArrayLike =
  | any[]
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array

type ArrayLikeAndString = ArrayLike | string

export interface BWTransformed {
  data: ArrayLikeAndString,
  start: number,
  eof: number
}

export type ArrayLikeConstructor = (length: number) => ArrayLike

function array(length: number): any[] {
  return new Array(length)
}

export function bwt(input: ArrayLikeAndString, ctor: ArrayLikeConstructor = array): BWTransformed {
  const len = input.length + 2
  const isString = typeof input === 'string'
  const rotations = new Int32Array(len)
  for (let i = 0; i < len; i++) {
    rotations[i] = i
  }
  const EOF = len - 2
  const START = -1
  const last = len - 1
  rotations.sort((a, b) => {
    for (let i = 0; i < len; i++) {
      const x = a + i > last ? i - (len - a) - 1 : i + a - 1
      const y = b + i > last ? i - (len - b) - 1 : i + b - 1
      if (x === EOF) {
        return Order.GT
      }
      else if (x === START) {
        return y === EOF ? Order.LT : Order.GT
      }
      else if (y === EOF || y === START) {
        return Order.LT
      }
      else if (input[x] < input[y]) {
        return Order.LT
      }
      else if (input[x] > input[y]) {
        return Order.GT
      }
    }
    return Order.EQ
  })
  let start = 0
  let eof = 0
  const data = isString ? new Array(input.length) : ctor(input.length)
  let added = 0
  for (let i = 0; i < len; i++) {
    const shift = rotations[i]
    const real = shift + last > last ? last - (len - shift) - 1 : last + shift - 1
    if (real === EOF) {
      eof = i
    }
    else if (real === START) {
      start = i
    }
    else {
      data[added++] = input[real]
    }
  }
  return {
    start,
    data: isString ? data.join('') : data,
    eof
  }
}

export function ibwt({start, data, eof}: BWTransformed, ctor: ArrayLikeConstructor = array): ArrayLikeAndString {
  const len = data.length + 2
  const isString = typeof data === 'string'
  const sorted = new Int32Array(len)
  const permutations = new Int32Array(len)
  for (let i = 0; i < len; i++) {
    sorted[i] = i
  }
  sorted.sort((a, b) => {
    if (a === eof) {
      return Order.GT
    }
    else if (a === start) {
      return b === eof ? Order.LT : Order.GT
    }
    else if (b === start || b === eof) {
      return Order.LT
    }
    const x = a + (a >= start ? -1 + (a >= eof ? -1 : 0) : 0)
    const y = b + (b >= start ? -1 + (b >= eof ? -1 : 0) : 0)
    return data[x] < data[y]
      ? Order.LT
      : (
        data[x] > data[y]
        ? Order.GT
        : (a < b ? Order.LT : Order.GT)
      )
  })
  for (let i = 0; i < len; i++) {
    permutations[sorted[i]] = i
  }
  let current = len - 1
  const result = isString ? new Array(len - 2) : ctor(len - 2)
  let i = len - 2
  while (i--) {
    const idx = current + (current < start ? 0 : (-1 + (current < eof ? 0 : -1)))
    result[i] = data[idx]
    current = permutations[current]
  }
  return isString ? result.join('') : result
}
