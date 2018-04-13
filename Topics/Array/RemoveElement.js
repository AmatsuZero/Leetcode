/*
*在一个数组里面移除指定value，并且返回新的数组长度。
* 这题唯一需要注意的地方在于in place，不能新建另一个数组。
* */

module.exports = function (inputArray, target) {
    let j = 0
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] === target) {
            continue
        }
        inputArray[j] = inputArray[i]
        j++
    }
    return j
}