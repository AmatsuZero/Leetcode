/*
* Given a string s and a dictionary of words dict, add spaces in s to construct a sentence where each word is a valid dictionary word.

Return all such possible sentences.

For example, given s = "catsanddog", dict = ["cat", "cats", "and", "sand", "dog"].

A solution is ["cats and dog", "cat sand dog"].
* */

const DFS = (str, start, vals, val, dp) => {
    const len = str.length
    if (start === len) {
        vals.push(val)
    } else {
        for (let i = 1; i <= len - start; i++) {
            if (dp[start][i] === 1) {
                let oldLen = val.length
                if (oldLen !== 0)
                    val += " "
                val += str.substr(start, i)
                // 从start+1来时继续DFS
                DFS(str, start+i, vals, val, dp)
                val = val.substring(oldLen)
            }
        }
    }
}

module.exports = (str, dict) => {
    const len = str.length,
        dp = new Array(str.length),
        vals = [],
        val = ""
    for (let i = 0; i < len; i++) {
        dp[i] = new Array(len+1).fill(0)
    }
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < len - i + 1; j++) {
            if (dict.has(str.substr(j ,i))) {
                dp[i][j] = 1
                continue
            }
            // 如果不存在，则看子串能不能被切分
            for (let k = 1; k < i && k < len - j; k++) {
                if (dp[j][k] && dp[j+k][i-k]) {
                    dp[j][i] = 2
                    break
                }
            }
        }
    }
    // 不能切分，不用DFS了
    if (dp[0][len] === 0)
        return vals

    DFS(str, 0, vals, val, dp)
    return vals
}
