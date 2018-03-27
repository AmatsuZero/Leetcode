/*
Given an integer, write a function to determine if it is a power of two
* */

module.exports = (num) => {
    if (num < 0) return false
    let n = num
    let hasOne = false
    while (n > 0) {
        if ((n & 1) > 0) {
            return !hasOne
        }
        n >>= 1
    }
    return hasOne
}
