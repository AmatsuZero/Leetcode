/*
*Given a non-negative number represented as an array of digits, plus one to the number.
The digits are stored such that the most significant digit is at the head of the list.
* */

module.exports = function (digits) {
    let res = Array(digits.length).fill(0)
    let sum = 0
    let one = 1
    for (let i = digits.length - 1; i >= 0; i--) {
        sum = Math.floor(one + digits[i])
        one = Math.floor(sum/10)
        res[i] = Math.floor(sum % 10)
    }
    if (one > 0) res.unshift(one)
    return res
}