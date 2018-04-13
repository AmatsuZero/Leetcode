/*
背包问题五（最大重量+所有可能结果+不同排列）

题目描述：

 Given n items with size nums[i] which an integer array and all positive numbers.
 An integer target denotes the size of a backpack. Find the number of possible fill the backpack.
 Each item may only be used once
样例输入：

[1,2,3,3,7],7
样例输出：

2

* */

module.exports = (nums, target) => {
    const dp = new Array(target+1).fill(0)
    dp[0] = 1
    for (let i = 0; i < nums.length; i++)
        for (let j = target; j >= 0; j--)
            if (j >= nums[i])
                dp[j] += dp[j-nums[i]]
    return dp[target]
}
