/*
* Given two integers n and k, return all possible combinations of k numbers out of 1,2,...,n.
* */

const DFS = (ret, curr, n, k, level) => {
    if (curr.length === k) {
        ret.push([...curr]) // 这里不要直接传curr的地址，需要拷贝一份
    } else if (curr.length < k) {
        for (let i = level; i <= n; ++i) {
            curr.push(i)
            DFS(ret, curr, n, k, i+1)
            curr.pop()
        }
    }
}

module.exports = (n, k) => {
    const ret = []
    if (n <= 0) return ret
    const curr = []
    DFS(ret, curr, n, k , 1)
    return ret
}
