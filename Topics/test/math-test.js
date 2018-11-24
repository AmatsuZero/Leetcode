const { assert }= require('chai')
const {describe, it} = require('mocha')
const {
    ReverseInteger,
    RPN,
    GCD
} = require("../Math")

describe("数学相关", () => {
    it("翻转数字", () => {
        assert.strictEqual(ReverseInteger(123), 321)
        assert.strictEqual(ReverseInteger(-123), -321)
        assert.strictEqual(ReverseInteger(-100), -1)
        assert.strictEqual(ReverseInteger(1002), 2001)
        //Big integer
        assert.strictEqual(ReverseInteger(1463847412), 2147483641)
        assert.strictEqual(ReverseInteger(-2147447412), -2147447412)
        assert.strictEqual(ReverseInteger(2147447412), 2147447412)
    })

    it("逆波兰表达式", () => {
        assert.strictEqual(RPN("1+2"), 3)
        assert.strictEqual(RPN("1+2+3"), 6)
        assert.strictEqual(RPN("1+2*3"), 7)
        assert.strictEqual(RPN("(1+2)*3"), 9)
        assert.strictEqual(RPN("(1+2)*3!"), 18)
        assert.strictEqual(RPN("1+√4*3!"), 13)
        assert.strictEqual(RPN("1+√4!*3!"), 13)
        assert.strictEqual(RPN("(1+2)*(3+4)"), 21)
        assert.strictEqual(RPN("√√81"), 3)
        assert.strictEqual(RPN("√√81!"), 6)
        assert.strictEqual(RPN("√√81!!"), 720)
    })

    it("最大公约数", () => {
        assert.strictEqual(GCD(100,150), 50)
    })
})
