/*
Given two binary strings, return their sum (also a binary string).

For example, a = "11" b = "1" Return "100".
* */

const reducer = (last, curr) => last + String.fromCharCode(curr)

module.exports = (str1, str2) => {
    if (typeof str1 !== "string" || typeof str2 !== "string") throw new Error("入参必须是字符串")
    if (str1.length === 0) return str2
    if (str2.length === 0) return str1
    let ret = [],
        carry = 0, // 是否进位
        index1 = str1.length-1,
        index2 = str2.length-1
    const zeroCharCode = "0".charCodeAt(0)
    while (index1 >= 0 && index2 >= 0) {
        let num = (str1.charCodeAt(index1) - zeroCharCode) + (str2.charCodeAt(index2) - zeroCharCode) + carry
        carry = Math.floor(num/2)
        num = Math.floor(num%2)
        index1--
        index2--
        ret.unshift(num+zeroCharCode)
    }
    if (index1 < 0 && index2 < 0 && carry === 1) {
        ret.unshift(carry+zeroCharCode)
        return ret.reduce(reducer, "")
    }
    while (index1 >= 0) {
        let num = str1.charCodeAt(index1)-zeroCharCode+carry
        carry = Math.floor(num/2)
        num = Math.floor(num%2)
        index1--
        ret.unshift(num+zeroCharCode)
    }
    while (index2 >= 0) {
        let num = str2.charCodeAt(index2)-zeroCharCode+carry
        carry = Math.floor(num/2)
        num = Math.floor(num%2)
        index2--
        ret.unshift(num+zeroCharCode)
    }
    if (carry === 1)
        ret.unshift(carry+zeroCharCode)
    return ret.reduce(reducer, "")
}
