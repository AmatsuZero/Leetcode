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

const { TreeNode } = require('../DataStructure/BinaryTree')

const build = (inorder, x, y, postorder, i ,j) => {
    if (x >= 0 && x <= y && i >= 0 && i <= j) {
        if (x === y) //只有一个元素
            return new TreeNode(postorder[j])
        else if (x < y) { // 多于一个元素
            const root = new TreeNode(postorder[j])
            // 找到根节点在中序遍历的下标
            let idx = x
            while (idx < y && inorder[idx] !== postorder[j])
                idx++
            // 左子树非空，构建左子树
            const leftLength = idx - x
            if (leftLength > 0) // i, i + leftLength - 1，前序遍历的左子树的起始，结束位置
                root.left = build(inorder, x, idx-1, postorder, i, i+leftLength-1)
            // 右子树非空，构建右子树
            const rightLength = y - idx
            if (rightLength > 0)  // i + leftLength, j - 1，前序遍历的右子树的起始，结束位置
                root.right = build(inorder, idx+1, y, postorder, i+leftLength, j-1)
            return root
        } else
            return null
    } else
        return null

}

module.exports = (inorder, postorder) => {
    // 检验参数
    if (inorder === null || postorder === null || inorder.length === 0 || inorder.length !== postorder.length) return null
    return build(inorder, 0, inorder.length-1, postorder, 0, postorder.length-1)
}
