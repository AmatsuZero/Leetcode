/*
Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example: Given binary tree {3,9,20,#,#,15,7},

    3
   / \
  9  20
    /  \
   15   7
return its level order traversal as:

[
  [3],
  [9,20],
  [15,7]
]
* */

const maxDepth = require('./MaximumDepthOfBinaryTree')

const traverse = (ret, root, level) => {
    if (root === null)
        return ret
    if (ret[level] === undefined) {
        ret[level] = [root.val]
    } else {
        ret[level].push(root.val)
    }
    traverse(ret, root.left, level+1)
    traverse(ret, root.right, level+1)
}

module.exports = (root) => {
    const ret = new Array(maxDepth(root))
    if (ret.length === 0) return ret
    traverse(ret,root,0)
    return ret
}
