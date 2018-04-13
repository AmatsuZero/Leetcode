/*
* Given a string s and a dictionary of words dict, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

For example, given s = "leetcode", dict = ["leet", "code"].

Return true because "leetcode" can be segmented as "leet code".
* */

module.exports = (str, dict) => {
    const len = str.length
    const dp = new Array(len + 1).fill(false)
    dp[0] = true

    for (let i = 1; i <= len; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (dp[j] && dict.has(str.substr(j, i-j))) {
                dp[i] = true
                break
            }
        }
    }

    return dp[len]
}
