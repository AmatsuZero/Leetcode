/*
* Given an array of intergers, find two numbers such that they add up to a specific target number. The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2 Please note that your returned answers (both index1 and index2) are not zero-based.

You may assume that each input would have exactly one solution.
Input: numbers={2, 7, 11, 15}, target=9 Output: index1=1, index2=2
* */

module.exports = function (array, target) {
    let ret = []
    if (array.length <= 1) return ret
    // 新建一个Map，用来存储元素和Index
    let map = new Map()
    array.forEach((value, index) => {
        map.set(value, index)
    })
    for (let i = 0; i < array.length; i++) {
        const restVal = target - array[i]
        if (map.has(restVal)) {
            const index = map.get(restVal)
            // 如果是同一个数字，我们就pass，是不会取这个值的
            if (index === i) continue
            if (index < i) {
                ret.push(index+1)
                ret.push(i+1)
                return ret
            } else {
                ret.push(i+1)
                ret.push(index+1)
                return ret
            }
        }
    }
}