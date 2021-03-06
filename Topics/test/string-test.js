const {describe, it} = require('mocha')
const { assert } = require('chai')
const {
    addBinary,
    basicCalculator,
    BoyerMoore: BM,
    Sunday,
    KMP,
    Manacher,
    IntegerToEnglish
} = require("../String")
const { longestPalindromeLength } = Manacher
const JD = require("../Interview/JD/RemoveRedundantBracket")

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
    it("去除多余括号", () => {
        const input = "(1,2,3,(4,5),6,(7,8,9))"
        assert.strictEqual(JD(input), "(1,2,3,4,5,6,7,8,9)")
    })
    it('数字改为英文描述',  () => {
        assert.strictEqual(IntegerToEnglish(2147483647), "Two Billion One Hundred Forty Seven Million Four Hundred Eighty Three Thousand Six Hundred Forty Seven")
        assert.strictEqual(IntegerToEnglish(1000000001), "One Billion One")
    });
})
