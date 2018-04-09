/*
* Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time
* */
module.exports = grid => {
    if (grid.length === 0 || grid[0].length === 0) return 0
    const row = grid.length,
        col = grid[0].length

    const dp = new Array(row)
    for (let i = 0; i < row; i++)
        dp[i] = new Array(col).fill(0)

    dp[0][0] = grid[0][0]
    for (let i = 1; i < row; i++)
        dp[i][0] = dp[i-1][0] + grid[i][0]
    for (let j = 1; j < col; j++)
        dp[0][j] = dp[0][j-1] + grid[0][j]
    for (let i = 1; i < row; i++)
        for (let j = 1; j < col; j++)
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j]

    return dp[row-1][col-1]
}
