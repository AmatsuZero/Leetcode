/*
Given a binary tree, return the bottom-up level order traversal of its nodes' values. (from left to right, level by level from leaf to root)

For example: Given binary tree {3,9,20,#,#,15,7}

    3
   / \
  9  20
    /  \
   15   7

return its level order traversal as:

[
  [15,7],
  [9,20],
  [3]
]
* */

const maxDepth = require('./MaximumDepthOfBinaryTree')

const DFS = (ret, level, root) => {
    if (root === null)
        return ret
    if (ret[level] === undefined) {
        ret[level] = [root.val]
    } else {
        ret[level].push(root.val)
    }
    DFS(ret, level-1, root.left)
    DFS(ret, level-1, root.right)
}

module.exports = (root) => {
    const ret = new Array(maxDepth(root))
    if (ret.length === 0) return ret
    DFS(ret,ret.length-1, root)
    return ret
}
