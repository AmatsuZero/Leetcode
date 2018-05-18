const { assert }= require('chai')
const {describe, it } = require('mocha')
const {
    duplicateNums,
    containNum,
    replaceSpace,
    buildTree,
} = require("../剑指Offer")
const { preOrderWithInOrder } = buildTree
const { BinaryTree } = require("../DataStructure/BinaryTree")

describe("剑指Offer题目", () => {
    it("去掉重复数字", () => {
        assert.isOk(duplicateNums([2, 3, 1, 0, 2, 5, 3]))
    })
    it("包含某数字", () => {
        const matrix = [
         [1,   4,  7, 11, 15],
         [2,   5,  8, 12, 19],
         [3,   6,  9, 16, 22],
         [10, 13, 14, 17, 24],
         [18, 21, 23, 26, 30]
        ]
        assert.isOk(containNum(matrix, 5))
        assert.isNotOk(containNum(matrix, 20))
    })
    it("替换空格", () => {
        assert.strictEqual(replaceSpace("We Are Happy"), "We%20Are%20Happy")
    })

    it("构建二叉树： 前序遍历 & 后序遍历", () => {
        const head = preOrderWithInOrder([3,9,20,15,7], [9,3,15,20,7])
        BinaryTree.inOrderTraverse(head, node => console.log("当前节点值: %d\n中序下一节点: %O", node.val, node.nextInOrder))
    })
})
