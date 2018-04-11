const { assert }= require('chai')
const {describe, it} = require('mocha')
const reverseInteger = require("../Math/ReverseInteger")

describe("数学相关", () => {
    it("翻转数字", () => {
        assert.strictEqual(reverseInteger(123), 321)
        assert.strictEqual(reverseInteger(-123), -321)
    })
})
