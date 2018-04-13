/*
* 背包问题 I
*
* Given n items with size Ai, an integer m denotes the size of a backpack.
How full you can fill this backpack?

样例输入：

[2,3,5,7],11
[2,3,5,7],12
样例输出：

10
12
* */

module.exports = (A, m) => {
    const dp = new Array(m+1).fill(0)
    for (let i = 0; i < A.length; i++)
        for (let j = m; j > 0; j--)
            if (j >= A[i])
                dp[j] = Math.max(dp[j -A[i]] + A[i], dp[j-1])
    return dp[m]
}
