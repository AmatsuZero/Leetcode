/*
* 背包问题四（最大重量+所有可能结果）
题目描述：

 Given an integer array nums with all positive numbers and no duplicates,
 find the number of possible combinations that add up to a positive integer target.

样例输入

[1,2,4],4
样例输出

6
* */

module.exports = (nums, target) => {
    const dp = new Array(target+1).fill(0)
    dp[0] = 1
    for (let j = 1; j <= target; j++)
        for (let i = 0; i < nums.length; i++)
            if (j >= nums[i])
                dp[j] += dp[j-nums[i]]
    return dp[target]
}
