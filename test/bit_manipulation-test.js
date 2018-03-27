const assert = require('assert')
const {describe, it} = require('mocha')
const missingNumber = require('../Bit Manipulation/MissingNumber')
const hammingWeight = require('../Bit Manipulation/NumberOfBits')

describe('#Missing Number', () => {
    it('#位运算解法', () => {
        assert.strictEqual(missingNumber([0,1,2,4,5]), 3)
    })
})

describe('#Number of Bits', () => {
    it('给出一个整数，求它包含二进制1的位数', () => {
        assert.strictEqual(hammingWeight(11), 3)
    })
})


