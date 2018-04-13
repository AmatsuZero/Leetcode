/*
题目描述

在一个长度为 n 的数组里的所有数字都在 0 到 n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字是重复的。也不知道每个数字重复几次。请找出数组中任意一个重复的数字。

例如，如果输入长度为 7 的数组 {2, 3, 1, 0, 2, 5, 3}，那么对应的输出是第一个重复的数字 2。

要求复杂度为 O(N) + O(1)，时间复杂度 O(N)，空间复杂度 O(1)。因此不能使用排序的方法，也不能使用额外的标记数组。
* */

const swap = (array, index1, index2) => {
    const temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
}

module.exports = nums => {
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] !== i && nums[i] !== nums[nums[i]])
            swap(nums, i, nums[i])
        if (nums[i] !== i && nums[i] === nums[nums[i]])
            return true
    }
    return false
}
