const {describe, it} = require('mocha')
const { assert } = require('chai')
const combination = require("../BackTracing/Combination")
const combinationSum = require("../BackTracing/CombinationSum")
const phoneNumber = require("../BackTracing/LetterCombinationOfPhoneNumber")
const subsets = require("../BackTracing/Subsets")
const subsetsWithDuplicate = require("../BackTracing/SubsetsII")
const permutations = require("../BackTracing/Permutation")

describe("DFS+BackTracing", () => {
    it("Combination", () => {
        assert.sameDeepMembers(combination(3,2), [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ])
    })
    it("Combination Sum", () => {
        assert.sameDeepMembers(combinationSum([1,2,3], 3), [ [ 1, 1, 1 ], [ 1, 2 ], [ 3 ] ])
    })
    it("Letter Combinations of Phone Number", () => {
        console.log(phoneNumber(["2","3"]))
    })
    it("所有子集合", () => {
        console.log(subsets([1,2,3]))
    })
    it("所有子集合， 输入有重复", () => {
        console.log(subsetsWithDuplicate([1,2,2]))
    })
    it("全遍历数组排列组合", () => {
        console.log(permutations([1,4,5]))
    })
})
