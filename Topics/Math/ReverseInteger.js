/*
* Reverse Integer: Reverse digits of an integer.

Example1: x = 123, return 321. Example: x = -123, return -321.

题目翻译: 反转一个数字，比如123要反转为321，-123反转为-321
* */

module.exports = input => {
    if (input === 0) return input
    let ret = 0
    while (input !== 0) {
        if (ret > ~~(Number.MAX_SAFE_INTEGER/10) || ret < ~~(-Number.MAX_SAFE_INTEGER/10))
            return 0
        ret = ret * 10 + input % 10
        input = ~~(input / 10)
    }
    return ret
}
