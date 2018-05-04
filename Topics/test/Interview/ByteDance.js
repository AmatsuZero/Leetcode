const { expect } = require("chai")
const {
    difference,
    cipherOrder
} = require("../../Interview/ByteDance/index")

it('输入一组数和差值，返回获取指定差的个数', () => {
    expect(difference([1,5,3,4,2],2)).to.equal(2)
    expect(difference([5,1,5,1,3,4,1,4,3,2],2)).to.equal(2)
})

it('从1到n的数按照字典序排序, 求第m个数的值', () => {
    expect(cipherOrder(11, 4)).to.equal(2)
})
