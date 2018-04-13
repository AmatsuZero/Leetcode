const { assert }= require('chai')
const {describe, it} = require('mocha')
const reverseInteger = require("../Math/ReverseInteger")
const rpn = require("../Math/RPN")

describe("数学相关", () => {
    it("翻转数字", () => {
        assert.strictEqual(reverseInteger(123), 321)
        assert.strictEqual(reverseInteger(-123), -321)
    })
    it("逆波兰表达式", () => {
        assert.strictEqual(rpn("1+2"), 3)
        assert.strictEqual(rpn("1+2+3"), 6)
        assert.strictEqual(rpn("1+2*3"), 7)
        assert.strictEqual(rpn("(1+2)*3"), 9)
        assert.strictEqual(rpn("(1+2)*3!"), 18)
        assert.strictEqual(rpn("1+√4*3!"), 13)
        assert.strictEqual(rpn("1+√4!*3!"), 13)
        assert.strictEqual(rpn("(1+2)*(3+4)"), 21)
        assert.strictEqual(rpn("√√81"), 3)
        assert.strictEqual(rpn("√√81!"), 6)
        assert.strictEqual(rpn("√√81!!"), 720)
    })
})
