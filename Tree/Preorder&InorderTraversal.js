// Source : https://oj.leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

/**********************************************************************************
 *
 * Given preorder and inorder traversal of a tree, construct the binary tree.
 *
 * Note:
 * You may assume that duplicates do not exist in the tree.
 *
 *
 **********************************************************************************/

const { TreeNode } = require('../DataStructure/BinaryTree')

// 为了避免数组的复杂操作，这里直接用左右界和数组的引用来代表一段前序遍历和中序遍历
// 即preorder[lp, rp]代表了当前子树的前序遍历，inorder[li, ri]代表了当前子树的中序遍历
const build = (preorder, inorder, lp, rp, li, ri) => {
    // 判断长度为0的情况
    if (lp > rp) return null
    // 设置根节点
    const root = new TreeNode(preorder[lp])
    // 找到根节点在inorder中的位置
    for (let k = li; k <= ri; k++) {
        if (preorder[lp] === inorder[k]) {
            // 分治处理两棵子树
            root.left = build(preorder, inorder, lp+1, lp+(k-li), li, k-1)
            root.right = build(preorder, inorder, lp+(k-li)+1, rp, k+1, ri)
        }
    }
    // 返回这棵子树
    return root
}

module.exports = (preorder, inorder) => {
    return build(preorder, inorder, 0, preorder.length-1, 0, inorder.length-1)
}
