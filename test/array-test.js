const assert = require('assert')
const { describe, it } = require('mocha')
const twoSum = require('../Array/TwoSum')
const removeElement = require('../Array/RemoveElement')
const removeDuplicate = require('../Array/RemoveDuplicatesFromSortedArray')
const removeDuplicateII = require('../Array/RemoveDuplicatesfromSortedArrayII')
const plusOne = require('../Array/PlusOne')
const pascalTri = require('../Array/PascalTriangle')
const pascalTriII = require('../Array/PascalTriangleII')
const mergeSortedArray = require('../Array/MergeSortedArray')
const twoSumII = require('../Array/TwoSumII')
const threeSum = require('../Array/ThreeSum')

describe('Array', () => {

    describe('#K sum', () => {
        it('两数之和', () => {
            assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [0,1])
        })
        it('两数之和, 返回的结果为所在数组的位置，且有序', () => {
            assert.deepStrictEqual(twoSumII([2, 7, 11, 15], 9), [1,2])
        })
        it('三数之和', () => {
            const result = new Set([
                [-1, 0, 1],
                [-1, -1, 2]
            ])
            assert.deepStrictEqual(threeSum([-1, 0, 1, 2, -1, -4]), result)
        })
    })

    describe('#Remove Element', () => {
        it('移除指定元素', () => {
            assert.strictEqual(removeElement([1,2,2,3,2,4], 2), 3)
        })
        it('删除重复元素', () => {
            assert.strictEqual(removeDuplicate([1,1,2]), 2)
        })
        it('移除重复的元素，但是可以允许最多两次重复元素存在', () => {
            assert.strictEqual(removeDuplicateII([1,1,1,2,2,3]), 5)
        })
    })

    describe('#Plus One', () => {
        it('数组代表一个正数的每一位，给这个数加1', () => {
            assert.deepStrictEqual(plusOne([9,9,9]), [1,0,0,0])
        })
    })

    describe('#Pascal Triangle', () => {
        it('根据给定行数生成帕斯卡三角', () => {
            assert.deepStrictEqual(pascalTri(5), [
                [1],
                [1,1],
                [1,2,1],
                [1,3,3,1],
                [1,4,6,4,1]
            ])
        })
        it('给定行数，生成帕斯卡三角所在行的数组', () => {
            assert.deepStrictEqual(pascalTriII(3), [1,3,3,1])
        })
    })

    describe('#Merge Sorted Array', () => {
        it('合并两个有序数组A、B到A', () => {
            const merged = mergeSortedArray([1,3,6], [2,4,5])
            assert.deepStrictEqual(merged, [1,2,3,4,5,6])
        })
    })
})