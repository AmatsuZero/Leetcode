// Source : https://oj.leetcode.com/problems/minimum-depth-of-binary-tree/

/**********************************************************************************
 *
 * Given a binary tree, find its minimum depth.
 *
 * The minimum depth is the number of nodes along the shortest path from the root node
 * down to the nearest leaf node.
 *
 **********************************************************************************/

/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */

const minDepth = (root) => {
    if (root === null) return 0
    if (root.left === null && root.right === null) return 1
    let left = Infinity
    if (root.left !== null) {
        left = minDepth(root.left) + 1
    }
    let right = Infinity
    if (root.right) {
        right = minDepth(root.right) + 1
    }
    return Math.min(left, right)
}

module.exports = (root) => {
    return minDepth(root)
}
