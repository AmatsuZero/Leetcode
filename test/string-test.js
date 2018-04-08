const { longestPalindromeLength } = require("../String/Manacher")
const addBinary = require("../String/AddBinary")
const basicCalculator= require("../String/BasicCalculatorII")
const BM = require("../String/BoyerMoore")
const Sunday = require("../String/Sunday")
const KMP = require("../String/KMP")
const {describe, it} = require('mocha')
const { assert } = require('chai')

describe("字符串算法相关测试", () => {
    it("通过Manacher算法寻找最长回文子串", () => {
        const testStr = "detartrated"
        console.log(longestPalindromeLength(testStr))
    })
    it("二进制字符串相加，返回和也是二进制字符串", () => {
        assert.isOk(addBinary("11", "1") === "100")
    })
    it("算数表达式，其结果也是字符串", () => {
        assert.isOk(basicCalculator("3+5 / 2") === "5")
    })
    it("BM算法", () => assert.strictEqual(BM("HERE IS A SIMPLE EXAMPLE", "EXAMPLE"), 17))
    it("Sunday算法", () => assert.strictEqual(Sunday("HERE IS A SIMPLE EXAMPLE", "EXAMPLE"), 17))
    it("KMP算法", () => assert.strictEqual(KMP("HERE IS A SIMPLE EXAMPLE", "EXAMPLE"), 17))
})
