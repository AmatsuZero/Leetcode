/* 给定一个整数数列，找出其中和为特定值的那两个数。
 你可以假设每个输入都只会有一种答案，同样的元素不能被重用。

    给定 nums = [2, 7, 11, 15], target = 9

    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]
 */

module.exports = function (nums, target) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
}