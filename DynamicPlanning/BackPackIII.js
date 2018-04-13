/*
Given n kind of items with size Ai and value Vi( each item has an infinite number available)
and a backpack with size m.

What's the maximum value can you put into the backpack?

样例输入:
10,[2,3,5,7],[1,5,2,4]

样例输出
15

* */

module.exports = (m, A, V) => {
    const dp = new Array(m+1).fill(0)
    for (let i = 0; i < A.length; i++)
        for (let j = 1; j <= m; j++)
            if (j >= A[i])
                dp[j] = Math.max(dp[j], dp[j-A[i]] + V[i])
    return dp[m]
}
