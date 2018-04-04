const { assert } = require('chai')
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
const hasPathSumII = require('../Tree/PathSumII')
const toBST = require('../Tree/SortedListToBST')
const SortedList = require('../DataStructure/SortedLinkedList')
const TierTree = require('../DataStructure/TierTree')
const RBTree = require('../DataStructure/RBTree')

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
        assert.sameDeepMembers([3,9,20,15,7], ret)
    })
    it('前序和中序构建二叉树', () => {
        const preorder = [3,9,20,15,7]
        const inorder = [9,3,15,20,7]
        tree = new BinaryTree(preInBuildTree, preorder, inorder)
        const ret = []
        tree.preOrderTraverse((val => ret.push(val)))
        assert.sameDeepMembers([3,9,20,15,7], ret)
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
        assert.sameDeepMembers(ret, [
            [15,7],
            [9,20],
            [3]
        ])
    })
    it('Z字形遍历', () => {
        const ret = zigzag(tree.root)
        assert.sameDeepMembers(ret, [
            [3],
            [20,9],
            [15,7]
        ])
    })
    it('是否是对称树', () => {
        const preorder = [1,2,2,3,4,4,3]
        const inorder = [3,2,4,4,2,3,1]
        tree = new BinaryTree(preInBuildTree, preorder, inorder)
        assert.isOk(isSymmetricTree(tree.root))
    })
    it('是否能求出指定和', () => {
        const preorder = [5,4,11,7,2,8,13,4,1]
        const inorder = [7,11,2,4,5,13,8,4,1]
        tree = new BinaryTree(preInBuildTree, preorder, inorder)
        assert.isOk(hasPathSum(tree.root, 22))
    })
    it('是否能求得指定和II', () => {
        const preorder = [5,4,11,7,2,8,13,4,1]
        const inorder = [7,11,2,4,5,13,8,4,1]
        tree = new BinaryTree(preInBuildTree, preorder, inorder)
        assert.isOk(hasPathSumII(tree.root, 22))
    })
    it('有序链表转搜索二叉树', () => {
        const sortedList = SortedList.from([5,4,11,7,2,8,13,4,1])
        let tree = toBST(sortedList.head)
        console.log(levelOrder(tree))
    })
})

describe('#字典树', () => {
    const tree = new TierTree(["apps", "apple", "cook", "cookie", "cold"])
    it('#Search', () => {
        assert.isNotOk(tree.search("ap"))
        assert.isOk(tree.search("apps"))
        assert.isOk(tree.search("apple"))
        assert.isNotOk(tree.search("coo"))
        assert.isOk(tree.search("cook"))
        assert.isOk(tree.search("cookie"))
        assert.isOk(tree.search("cold"))
    })
    it('#Delete', () => {
        tree.delete('cookie')
        assert.isOk(tree.search('cook'))
        assert.isNotOk(tree.search('cookie'))
        tree.delete("apple")
        assert.isOk(tree.search('apps'))
        assert.isNotOk(tree.search("apple"))
    })
})

describe('#红黑树', () => {
    let tree = new RBTree()
    it('测试插入', () => {
        const data = [10, 40, 30, 60, 90, 70, 20, 50, 80]
        data.forEach(value => tree.insert(value))
        tree.preOrderTraverse(val => console.log(val))
    })
})
