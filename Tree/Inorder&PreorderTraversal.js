// Source : https://oj.leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/

/**********************************************************************************
 *
 * Given inorder and postorder traversal of a tree, construct the binary tree.
 *
 * Note:
 * You may assume that duplicates do not exist in the tree.
 *
 *
 **********************************************************************************/

const {BinaryTree, TreeNode } = require('./BinaryTree')

const build = (inOrder, inOrderOffset, postOrder, postOffset, n) => {
    if (n <= 0 || postOrder.length <= 0 || inOrder.length === 0) return null
    const root = new TreeNode(postOrder[postOffset-1])
    if (n === 1) return root
    let i = 0
    for (let i = inOrderOffset; i < inOrderOffset + n; i++) {
        if (inOrder[i] === postOrder[postOffset+n-1]) break
    }
    if (i === inOrder.length) return null
    const left_n = i - inOrderOffset
    const right_n = inOrderOffset + n - i - 1
    root.left = build(inOrder, inOrderOffset, postOrder, postOffset, left_n)
    root.right = build(inOrder, i+1, postOrder, postOffset+left_n, right_n)
    return root
}

module.exports = (inOrder, postOrder) => (root) => {
    root = build(inOrder, 0, postOrder, 0, postOrder.length)
    return root
}
