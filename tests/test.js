const bwt = require('../dist/bwt')
const assert = require('assert')

const TEST_WORD = 'banana'
const transformedWord = bwt.bwt(TEST_WORD)

assert.equal(transformedWord.data, 'bnnaaa')
assert.equal(transformedWord.start, 3)
assert.equal(transformedWord.eof, 6)
assert.equal(bwt.ibwt(transformedWord), TEST_WORD)

const TEST_ARRAY = [41, 1, 32, 1, 33, 81]
const transformedArray = bwt.bwt(TEST_ARRAY)

assert.deepEqual(transformedArray.data, [ 41, 32, 1, 1, 33, 81 ])
assert.equal(transformedArray.start, 4)
assert.equal(transformedArray.eof, 6)
assert.deepEqual(bwt.ibwt(transformedArray), TEST_ARRAY)

const TEST_TYPED_ARRAY = new Uint16Array(6)
TEST_ARRAY.forEach((val, idx) => TEST_TYPED_ARRAY[idx] = val)

const transformedTypedArray = bwt.bwt(TEST_TYPED_ARRAY)
assert.deepEqual(transformedTypedArray.data, [ 41, 32, 1, 1, 33, 81 ])
assert.equal(transformedTypedArray.start, 4)
assert.equal(transformedTypedArray.eof, 6)
assert.deepEqual(bwt.ibwt(transformedTypedArray), TEST_ARRAY)
