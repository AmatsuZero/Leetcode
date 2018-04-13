/*
Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.
*/

const getHeight = (root) => {
    if (root === null) return 0
    const leftHeight = getHeight(root.left)
    if (leftHeight === -1) return -1
    const rightHeight = getHeight(root.right)
    if (rightHeight === -1) return -1
    const diffHeight = rightHeight > leftHeight ? rightHeight - leftHeight : leftHeight - rightHeight
    if (diffHeight > 1) return -1
    else return Math.max(leftHeight, rightHeight) + 1
}

module.exports = (root) => {
    if (root === null) return true
    return getHeight(root) !== -1
}
