/*
*Given n, how many structurally unique BST's (binary search trees) that store values 1...n?

For example, Given n = 3, there are a total of 5 unique BST's.

    1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
* */

module.exports = n => {
    const dp = new Array(n + 1).fill(0)
    // dp初始化
    dp[0] = 1
    dp[1] = 1

    for (let i = 2; i <= n; i++)
        for (let j = 0; j < i; j++)
            // 如果左子树的个数为j， 那么右子树的个数为i-j-1
            dp[i] += dp[j] * dp[i-j-1]
    return dp[n]
}
