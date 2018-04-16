/*
You are a professional robber planning to rob houses along a street.

Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them

is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

* */
module.exports = wealth => {
    const dp = []
    const length = wealth.length
    for (let i = 0; i < length; i++) {
        const choices = [0,0]
        dp.push(choices)
    }
    for (let i = 1; i < dp.length; i++) {
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1]) // 不抢
        dp[i][1] = dp[i-1][0] + wealth[i-1] // 抢
    }
    return Math.max(dp[length][0], dp[length][1])
}
