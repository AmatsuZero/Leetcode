/*
* Given a triangle, find the minimum path sum from top to bottom.
* Each step you may move to adjacent numbers on the row below.
* For example, given the following triangle:
*
* [
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]

The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).
* */

// 自底向上求解
module.exports = triangle => {
    if (triangle.length === 0)
        return 0
    const row = triangle.length
    const dp = new Array(row)
    // 用底层的数据初始化
    for (let i = 0; i < dp.length; i++)
        dp[i] = triangle[row-1][i]
    for (let i = row - 2; i >= 0; i--)
        for (let j = 0; j <= i; j++)
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j+1])
    return dp[0]
}
