/*
* Now consider if some obstacles are added to the grids. How many unique paths would there be?

An obstacle and empty space is marked as 1 and 0 respectively in the grid.
* */

module.exports = obstacleGrid => {
    if (obstacleGrid.length === 0 || obstacleGrid[0].length === 0) return 0
    const m = obstacleGrid.length,
        n = obstacleGrid[0].length
    const dp = new Array(m)
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(n).fill(0)
    }
    dp[0][0] = obstacleGrid[0][0] === 0 ? 1 : 0
    // 需要注意m * 1 和1 * n的初始化
    for (let i = 1; i < m; i++)
        dp[i][0] = dp[i-1][0] === 1 && obstacleGrid[i][0] === 0 ? 1 : 0
    for (let j = 1; j < n; j++)
        dp[0][j] = dp[0][j-1] === 1 && obstacleGrid[0][j] === 0 ? 1 : 0
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 1)
                dp[i][j] = 0
            else
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }
    return dp[m-1][n-1]
}
