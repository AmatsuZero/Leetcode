/*
* preorder = [3,9,20,15,7]
inorder =  [9,3,15,20,7]
* */
const { TreeNode } = require("../DataStructure/BinaryTree")

const PIBuild = (map, preorder, preL, preR, inorder, inL, inR) => {
    if (preL === preR)
        return new TreeNode(preorder[preL])
    if (preL > preR || inL > inR)
        return null
    const root = new TreeNode(preorder[preL])
    const inIdx = map.get(root.val)
    const leftTreeSize = inIdx - inL
    root.left = PIBuild(map, preorder, preL+1, preL + leftTreeSize, inorder, inL, inL + leftTreeSize - 1)
    root.right = PIBuild(map, preorder, preL + leftTreeSize + 1, preR, inorder, inL + leftTreeSize + 1, inR)
    return root
}

const preOrderWithInOrder = (preorder, inorder) => {
    const map = new Map()
    inorder.forEach((value, index) => map.set(value, index))
    return PIBuild(map, preorder, 0, preorder.length-1, inorder, 0, inorder.length-1)
}

module.exports = {
    preOrderWithInOrder
}

