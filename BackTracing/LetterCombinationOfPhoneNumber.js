/*
* Given a digit string, return all possible letter combinations that the number could represent. A mapping of digit to letters (just like on the telephone buttons) is given as below:
*
*   Input:Digit string "23"
    Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
* */

const  combinations = (ret, tmp, digits, dic, level) => {
    if (level === digits.length) {
        ret.push([...tmp])
    } else {
        const index = digits[level].charCodeAt(0) - '0'.charCodeAt(0)
        for (let i = 0; i < dic[index].length; i++) {
            tmp.push(dic[index][i])
            combinations(ret, tmp, digits, dic, level+1)
            tmp.pop()
        }
    }
}

module.exports = digits => {
    const ret = []
    const dic = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"].map(val => val.split(""))
    combinations(ret, [], digits, dic, 0)
    return ret
}
