const {describe, it} = require('mocha')
const { assert } = require('chai')
const canJump = require("../Greedy/JumpGame")
const candy = require("../Greedy/Candy")
const wordBreak = require("../Greedy/WordBreak")
const wordBreakII = require("../Greedy/WordBreakII")

describe("贪心算法", () => {
    it("Jump Game", () => {
        assert.isOk(canJump([2,3,1,1,4]))
        assert.isNotOk(canJump([3,2,1,0,4]))
    })
    it("糖果问题", () => {
        console.log(candy([1,3,6,2,4,8]))
    })
    it("是否包含在字典中的问题", () => {
        assert.isOk(wordBreak("leetcode", new Set(["leet", "code"])))
    })
    it("Word Break II", () => {
        console.log(wordBreakII("catsanddog", new Set(["cat", "cats", "and", "sand", "dog"])))
    })
})
