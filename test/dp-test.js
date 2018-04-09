const { assert }= require('chai')
const {describe, it} = require('mocha')
const { MaxProduct } = require('../DynamicPlanning/Chorus')
const DoublyLinkedList = require('../DataStructure/CircularLinkedList')
const UniquePath = require("../DynamicPlanning/UniquePath")
const MaxSubArr = require("../DynamicPlanning/MaxSubArray")
const MaxProductSubArr = require("../DynamicPlanning/MaxProdutSubArray")
const Triangle = require("../DynamicPlanning/Triangle")
const uniqueBSTCount = require("../DynamicPlanning/UniqueBinarySearchTrees")
const uniqueBSTArr = require("../DynamicPlanning/UniqueBinarySearchTreesII")

describe('#动态规划', () => {
    it('#合唱团问题：求最大乘积', () => {
        let ll = DoublyLinkedList.from([1,3,4,7])
        console.log(ll)
        const stu = [7,4,7], k = 2, d = 50
        assert.strictEqual(MaxProduct(stu, k, d), 49)
    })
    it('#在m*n矩阵从左上角走到右下角全部走法的问题', () => {
        console.log(UniquePath(3,3))
    })
    it('#最大和子数组', () => {
        assert.strictEqual(MaxSubArr([-2,1,-3,4,-1,2,1,-5,4]), 6)
    })
    it('#最大乘积子数组', () => {
        assert.strictEqual(MaxProductSubArr([2,3,-2,4]), 6)
    })
    it("#三角形求最小路径", () => {
        assert.strictEqual(Triangle([
            [2],
            [3,4],
            [6,5,7],
            [4,1,8,3]
        ]), 11)
    })
    it("根据数字能生成BST数组的个数", () => {
        assert.strictEqual(uniqueBSTCount(3), 5)
    })
    it("根据数字生成BST数组", () => {
        uniqueBSTArr(3).forEach(val => console.log(val.toString()))
    })
})
