const assert = require('assert')
const {describe, it} = require('mocha')
const { MaxProduct } = require('../DynamicPlanning/Chorus')
const DoublyLinkedList = require('../DataStructure/CircularLinkedList')

describe('#动态规划', () => {
    it('#合唱团问题：求最大乘积', () => {
        let ll = DoublyLinkedList.from([1,3,4,7])
        console.log(ll)
        const stu = [7,4,7], k = 2, d = 50
        assert.strictEqual(MaxProduct(stu, k, d), 49)
    })
})
