/*
* Given a collection of integers that might contain duplicates, S, return all possible subsets.

Note: Elements in a subset must be in non-descending order. The solution set must not contain duplicate subsets. For example, If S = [1,2,2], a solution is

[
  [2],
  [1],
  [1,2,2],
  [2,2],
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
        // 这里跳过相同的
        while (i < S.length - 1 && S[i] === S[i+1])
            i++
    }
}

module.exports = S => {
    const res = []
    if (S.length === 0) return res
    S.sort()
    res.push([])
    generate(0, [], S, res)
    return res
}
