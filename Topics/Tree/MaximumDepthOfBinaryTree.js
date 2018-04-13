/*
Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

For example:

Given binary tree [3,9,20,null,null,15,7],

     3
   / \
  9  20
    /  \
   15   7

return its depth = 3.
* */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const maxDepth = (root) => {
    if (root === null) return 0
    if (root.left === null && root.right === null) return 1
    let left = 1, right = 1
    if (root.left !== null) {
        left += maxDepth(root.left)
    }
    if (root.right !== null) {
        right += maxDepth(root.right)
    }
    return Math.max(left, right)
}

module.exports = (root) => {
    if (root === null) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
