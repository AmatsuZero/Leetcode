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
const threeSumCloset = require('../Array/ThreeSumCloset')
const fourSum = require('../Array/FourSum')
const kSum = require('../Array/KSum')
const findMin= require('../Array/FindMinimuminRotatedSortedArray')
const flower = require('../Array/CanPlaceFlowers')
const largestRect = require('../Array/LargestRectangleInHistogram')
const maxRect = require('../Array/MaximalRectangle')
const isPalindrome = require('../Array/PalindromeNumber')
const searchMatrix = require('../Array/Search2DMatrix')
const searchRange = require('../Array/SearchForRange')
const rpn = require("../Array/EvaluateRPN")
const anagram = require("../Array/ValidAnagram")
const continousSubArray = require("../Array/ShortestUnsortedContinuousSubarray")
const findMedian = require("../Array/MedianOfTwoSortedArrays")

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
        it('四数之和', () => {
            const ret = [ [ -1, -2, 1, 2 ], [ -1, 0, 0, 1 ], [ -2, 0, 0, 2 ] ]
            assert.deepStrictEqual(fourSum([1,0,-1,0,-2,2], 0), ret)
        })
        it('K Sum', () => {
            const ret = [ [ -1, -2, 1, 2 ], [ -1, 0, 0, 1 ], [ -2, 0, 0, 2 ] ]
            assert.deepStrictEqual(kSum([1,0,-1,0,-2,2], 0), ret)
        })
        it('给定一个整形数组S和一个具体的值，要求找出在这数组中三个元素的和和这个给定的值最小。input只有一个有效答案',  () => {
            assert.strictEqual(threeSumCloset([-1, 2, 1, -4], 1), 2)
        });
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

   describe('#Find Minimum in Rotated Sorted Array', () => {
       it('在一个轮转了的排序数组里面找到最小值', () => {
           assert.strictEqual(findMin([4,5,6,7,0,1,2]), 0)
       })
   })

    describe('#Can Place Flowers', () => {
        it('种花问题', () => {
            assert.ok(flower([1,0,0,0,1], 2) === false)
        })
    })

    describe('#Largest Rectangle in Histogram' ,() => {
        it('最大面积问题', () => {
            assert.strictEqual(largestRect([0,10]), 10)
        })
        it('矩阵最大面积问题', () => {
            const matrix = [
                [1,0,1,0,0],
                [1,0,1,1,1],
                [1,1,1,1,1],
                [1,0,0,1,0]
            ]
            assert.strictEqual(maxRect(matrix), 6)
        })
    })

    describe('#Is Palindrome', () => {
        it('是否是回文数', () => {
            assert.ok(isPalindrome(101))
        })
    })

    describe('#Search Matrix', () => {
        it('矩阵是否包含某值', () => {
            const matrix = [
                [1,  3,  5, 7],
                [10, 11, 16, 20],
                [23, 30, 34, 50]
            ]
            assert.ok(searchMatrix(matrix, 3))
        })
    })

    describe('#Search Range', () => {
        it('范围搜索', () => {
            const array = [5, 7, 7, 8, 8, 10]
            assert.deepStrictEqual(searchRange(array, 8), [3,4])
        })
    })

    describe("#逆波兰表达式", () => {
        it("求值", () => {
            assert.strictEqual(rpn(["2", "1", "+", "3", "*"]), 9)
            assert.strictEqual(rpn(["4", "13", "5", "/", "+"]), 6)
        })
    })

    describe("#回文字符串", () => {
        it("验证是否是回文字符串", () => {
            assert.ok(anagram("anagram", "nagaram"))
        })
    })

    describe("#子数组查找", () => {
        it("需要排序的子数组长度", () => {
            assert.ok(continousSubArray([2, 6, 4, 8, 10, 9, 15]), 5)
        })
    })

    describe("#寻找中位数", () => {
        it("中位数", () => {
            assert.strictEqual(findMedian([1,3,5],[2,4]), 3)
        })
    })
})
