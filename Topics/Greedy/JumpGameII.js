/*
* Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Your goal is to reach the last index in the minimum number of jumps.

For example: Given array A = [2,3,1,1,4]

The minimum number of jumps to reach the last index is 2.

 (Jump 1 step from index 0 to 1, then 3 steps to the last index.)
* */

module.exports = steps => {
    let step = 0,
        cur = 0,
        next = 0,
        i = 0,
        n = steps.length
    while (i < n) {
        if (cur >= n - 1)
            break
        while (i <= cur) {
            next = Math.max(next, steps[i]+1) // 更新最远达到点
            i++
        }
        step++
        cur = next
    }
    return step
}
