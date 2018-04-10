/*
*Given a set of distinct integers, S, return all possible subsets.

Note: Elements in a subset must be in non-descending order. The solution set must not contain duplicate subsets. For example, If S = [1,2,3], a solution is:

[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
* */
const generate = (start, v, S, res) => {
    if (start === S.length) return
    for (let i = start; i < S.length; i++) {
        v.push(S[i])
        res.push([...v])
        generate(i+1, v ,S, res)
        v.pop()
    }
}

module.exports = input => {
    const ret = []
    if (input.length === 0) return ret
    input.sort()
    // 空集合
    ret.push([])
    generate(0, [], input, ret)
    return ret
}
