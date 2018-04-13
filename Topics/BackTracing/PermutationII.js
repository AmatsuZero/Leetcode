/*
* Given a collection of numbers that might contain duplicates, return all possible unique permutations.

For example, [1,1,2] have the following unique permutations: [1,1,2], [1,2,1], and [2,1,1].
* */

const backTracking = (ret, curr, isVisited, num) => {
    if (curr.length === num.length) {
        ret.push([...curr])
    } else {
        for (let i = 0; i < num.length; i++) {
            if (isVisited[i] === false) {
                isVisited[i] = true
                curr.push(num[i])
                backTracking(ret, curr, isVisited, num)
                isVisited[i] = false
                curr.pop()
            }
        }
    }
}

module.exports = num => {
    const permutations = []
    if (num.length === 0) return permutations
    const isVisited = new Array(num.length).fill(false)
    backTracking(permutations, [], isVisited, num)
    return permutations
}
