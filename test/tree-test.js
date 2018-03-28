const assert = require('assert')
const { describe, it } = require('mocha')
const maxDepth = require('../Tree/MaximumDepthOfBinaryTree')
const { BinaryTree } = require('../DataStructure/BinaryTree')
const minDepth = require('../Tree/MinimumDepthOfBinaryTree')
const piBuildThree = require('../Tree/Inorder&PostorderTraversal')
const preInBuildTree = require('../Tree/Preorder&InorderTraversal')
const levelOrder = require('../Tree/BinaryTreeLevelOrderTraversal')
const reverseLevelOrder = require('../Tree/BinaryTreeLevelOrderTraversalII')
const zigzag = require('../Tree/ZigzagTraversal')
const isSymmetricTree = require('../Tree/SymmetricTree')
const hasPathSum = require('../Tree/PathSum')

describe('#Tree', () => {
    let tree
    beforeEach(() => {
        const preorder = [3,9,20,15,7]
        const inorder = [9,3,15,20,7]
        tree = new BinaryTree(preInBuildTree, preorder, inorder)
    })

    it('树最大深度', () => {
        assert.strictEqual(maxDepth(tree.root), 3)
    })
    it('树最小深度', () => {
        assert.strictEqual(minDepth(tree.root), 2)
    })
    it('中序和后序构建二叉树', () => {
        const preorder = [3,9,20,15,7]
        const inorder = [9,3,15,20,7]
        tree = new BinaryTree(piBuildThree, preorder, inorder)
        const ret = []
        tree.preOrderTraverse((val => ret.push(val)))
        assert.deepStrictEqual([3,9,20,15,7], ret)
    })
    it('前序和中序构建二叉树', () => {
        const preorder = [3,9,20,15,7]
        const inorder = [9,3,15,20,7]
        tree = new BinaryTree(preInBuildTree, preorder, inorder)
        const ret = []
        tree.preOrderTraverse((val => ret.push(val)))
        assert.deepStrictEqual([3,9,20,15,7], ret)
    })
    it('按层遍历树', () => {
        const ret = levelOrder(tree.root)
        assert.deepStrictEqual(ret, [
            [3],
            [9,20],
            [15,7]
        ])
    })
    it('倒序按层遍历', () => {
        const ret = reverseLevelOrder(tree.root)
        assert.deepStrictEqual(ret, [
            [15,7],
            [9,20],
            [3]
        ])
    })
    it('Z字形遍历', () => {
        const ret = zigzag(tree.root)
        assert.deepStrictEqual(ret, [
            [3],
            [20,9],
            [15,7]
        ])
    })
    it('是否是对称树', () => {
        const preorder = [1,2,2,3,4,4,3]
        const inorder = [3,2,4,4,2,3,1]
        tree = new BinaryTree(preInBuildTree, preorder, inorder)
        assert.ok(isSymmetricTree(tree.root))
    })
    it('是否能求出指定和', () => {
        const preorder = [5,4,11,7,2,8,13,4,1]
        const inorder = [7,11,2,4,5,13,8,4,1]
        tree = new BinaryTree(preInBuildTree, preorder, inorder)
        assert.ok(hasPathSum(tree.root, 22))
    })
})
