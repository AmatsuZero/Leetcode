/*
*题目描述
* 在n个元素的数组中，到到差值为K的数字对去重后的个数
*
* 输入描述：
* 第一行，n和k，n表示数字个数，k表示差值
* 第二行，n个正整数
*
* 输出
* 差值为k的数字对去重后的个数
*
* 示例1：
* 5 2
* 1 5 3 4 2
*
* 输出
* 3
* */

module.exports = (input, k) => {
    let count = 0,
        array = [...(new Set(input))]
    if (array.length <= 1) return count
    for (let i = 0; i < array.length-1; i++) {
        for (let j = i; j < array.length; j++) {
            if (array[i] - array[j] === k)
                count++
        }
    }
    return count
}
