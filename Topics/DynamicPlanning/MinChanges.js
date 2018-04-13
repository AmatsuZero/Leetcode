/*
* 找零问题
* */

module.exports = (notes, target) => {
    const results = new Array(notes.length+1)
    for (let i = 0; i <= notes.length; i++) {
        results[i] = new Array(target+1).fill(Number.MAX_SAFE_INTEGER)
        results[i][0] = 0
    }
    for (let j = 1; j <= target; j++) {
        for (let i = 1; i <= notes.length; i++) {
            if (j < notes[i-1]) {// notes数组下标是从0开始的,  results数组下标是从1开始计算的
                results[i][j] = results[i-1][j]
                continue
            }
            //每个问题的选择数目---选其中较小的
            if (results[i-1][j] < results[i][j - notes[i-1]] + 1)
                results[i][j] = results[i-1][j]
            else
                results[i][j] = results[i][j - notes[i-1]] + 1
        }
    }
    return results[notes.length][target]
}
