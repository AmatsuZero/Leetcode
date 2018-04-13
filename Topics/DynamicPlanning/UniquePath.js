/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?
* */

module.exports = (m,n) => {
    const dp = new Array(m)
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(n).fill(0)
        dp[i][0] = 1 // 初始化DP，m * 1情况全为1
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1 // 初始化DP，1 * n的情况全为1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            //dp[i][j]表示 从（0，0）到（i,j）唯一路径的数量
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }
    return dp[m-1][n-1]
}
