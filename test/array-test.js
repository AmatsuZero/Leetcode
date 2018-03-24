const assert = require('assert')

const twoSum = require('../Array/TwoSum')
const removeElement = require('../Array/RemoveElement')

describe('Array', () => {

    describe('#Two sum', () => {
        it('两数之和', () => {
            assert.strictEqual(twoSum([2, 7, 11, 15], 9), [0,1])
        })
    })

    describe('#Remove Element', () => {
        it('移除指定元素', () => {
            assert.strictEqual(removeElement([1,2,2,3,2,4], 2), 3)
        })
    })
})