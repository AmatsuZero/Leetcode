/*
* Given a set of candidate numbers (C) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.

The same repeated number may be chosen from C unlimited number of times.
* */

const backTracking = (ret, curr, candidates, target, level) => {
    if (target === 0) {
        ret.push([...curr])
    } else if (target > 0) {
        for (let i = level; i < candidates.length; i++) {
            target -= candidates[i]
            curr.push(candidates[i])
            backTracking(ret, curr, candidates, target, i)
            curr.pop()
            target += candidates[i]
        }
    }
}

module.exports = (candidates, target) => {
    const ret = []
    if (candidates.length === 0 || target < 0)
        return ret
    const curr = []
    candidates.sort()
    backTracking(ret, curr, candidates, target, 0)
    return ret
}
