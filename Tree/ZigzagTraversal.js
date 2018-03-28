/*
Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

For example: Given binary tree {3,9,20,#,#,15,7},

    3
   / \
  9  20
    /  \
   15   7

return its zigzag level order traversal as:

[
  [3],
  [20,9],
  [15,7]
]
* */

const maxDepth = require('./MaximumDepthOfBinaryTree')

const zigzag = (ret, root, level) => {
    if (root === null) return ret
    if (ret[level] === undefined) {
        ret[level] = [root.val]
    } else {
        ret[level].push(root.val)
    }
    zigzag(ret, root.left, level+1)
    zigzag(ret, root.right, level+1)
}

module.exports = (root) => {
    const ret = new Array(maxDepth(root))
    zigzag(ret, root, 0)
    for (let i = 1; i < ret.length; i+=2) {
        ret[i].reverse()
    }
    return ret
}
