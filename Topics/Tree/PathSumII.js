/*
Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.

For example: Given the below binary tree and sum = 22.

               5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1

return
[
   [5,4,11,2],
   [5,8,4,5]
]
* */
const DFS = (ret, curr, sum, tmpsum, root) => {
    if (root === null) return
    tmpsum += root.val
    curr.push(root.val)
    if (tmpsum === sum)
        if (root.left === null && root.right === null)
            return ret.push(curr)
    DFS(ret,curr, sum, tmpsum, root.left)
    DFS(ret, curr, sum, tmpsum, root.right)
}

module.exports = (root, sum) => {
    const ret = []
    if (root === null) return ret
    const curr = []
    DFS(ret, curr, sum, 0, root)
    return ret
}
