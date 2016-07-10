const bwt = require('../dist/bwt')
const assert = require('assert')

const TEST_WORD = 'banana'
const transformed = bwt.bwt(TEST_WORD)

assert.equal(transformed.data, 'bnnaaa')
assert.equal(transformed.start, 3)
assert.equal(transformed.eof, 6)
assert.equal(bwt.ibwt(transformed), TEST_WORD)
