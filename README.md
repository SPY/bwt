## Effective implementation of Burrows-Wheeler transform

```typescript
import {bwt, ibwt} from 'burrows-wheeler-transform'
import assert from 'assert'

// using with strings
const WORD = 'banana'
const transformedWord = bwt(WORD)
assert(typeof transformedWord.data === string)
assert(transformedWord.data === 'bnnaaa')
// start symbol is not included in encoded string and returned as position index
assert(transformedWord.start === 3)
// eof symbol is not included too
assert(transformedWord.eof === 6)
assert(ibwt(transformedWord) === WORD)

// using with any array
const ARRAY = [41, 1, 32, 1, 33, 81]
const transformedArray = bwt(ARRAY)
assert.deepEqual((ibwt(transformedArray), ARRAY)

// using with any array-like object
const TYPED_ARRAY = new Uint16Array(ARRAY.length)
ARRAY.forEach((val, idx) => TYPED_ARRAY[idx] = val)
const transformedTypedArray = bwt.bwt(TYPED_ARRAY)
// result of transformation on any array-like object is array
assert.deepEqual(transformedTypedArray.data, [ 41, 32, 1, 1, 33, 81 ])

```
