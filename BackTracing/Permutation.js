/*
*given a collection of numbers, return all posibile permutations.

For example, [1,2,3] have the following permutations: [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], and [3,2,1].
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
                while (i < num.length - 1 && num[i] === num[i+1]) // 跳过重复元素
                    ++i
            }
        }
    }
}

module.exports = num => {
    const permutations = []
    if (num.length === 0) return permutations
    const isVisited = new Array(num.length).fill(false)
    num.sort() // 排序，为了方便跳过重复的元素
    backTracking(permutations, [], isVisited, num)
    return permutations
}
