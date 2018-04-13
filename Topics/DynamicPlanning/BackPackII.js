/*
* 题目描述：

 Given n items with size Ai and value Vi, and a backpack with size m.
 What's the maximum value can you put into the backpack?
样例输入

    10,[2,3,5,7],[1,5,2,4]

样例输出

    9

* */

module.exports = (A, V, m) => {
    const dp = new Array(m+1).fill(0)
    for (let i = 0; i < A.length; i++)
        for (let j = m; j > 0; j--)
            if (j >= A[i])
                dp[j] = Math.max(dp[j-A[i]] + V[i], dp[j-1])
    return dp[m]
}
