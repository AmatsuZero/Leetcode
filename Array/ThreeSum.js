/*
* Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
Note: Elements in a triplet (a,b,c) must be in non-descending order. (ie, a ≤ b ≤ c) The solution set must not contain duplicate triplets.
* */

module.exports = function (numbers) {
    if (numbers.length <= 2) return numbers
    let ret = new Set()
    // 首先我们需要先对数组进行排序
    let nums = [].concat(numbers).sort()
    for (let i = 0; i < nums.length - 2; i++) {
        let j = i + 1
        let k = nums.length - 1
        while (j < k) {
            // 创建一个临时数组来保存每个解
            let curr = []
            if (nums[i]+nums[j]+nums[k] === 0) {
                curr.push(nums[i])
                curr.push(nums[j])
                curr.push(nums[k])
                ret.add(curr)
                j++
                k--
                //以下两个循环用来跳过重复解
                while (j < k && nums[j-1] === nums[j])
                    j++
                while (j < k && nums[k] === nums[k+1])
                    k--
            } else if (nums[i] + nums[j] + nums[k] < 0)//如果三数之和小于目标值
                j++
             else
                 k--
        }
        // 跳过重复解
        while (i < nums.length - 1 && nums[i] === nums[i+1])
            i++
    }
    return ret
}