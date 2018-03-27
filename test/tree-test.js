const assert = require('assert')
const { describe, it } = require('mocha')
const maxDepth = require('../Tree/MaximumDepthOfBinaryTree')
const { BinaryTree } = require('../Tree/BinaryTree')
const minDepth = require('../Tree/MinimumDepthOfBinaryTree')
const piBuildThree = require('../Tree/Inorder&PreorderTraversal')

describe('#Tree', () => {
    it('树最大深度', () => {
        const data = [3,9,20,null,null,15,7]
        const tree = new BinaryTree(data)
        assert.strictEqual(maxDepth(tree.root), 3)
    })
    it('树最小深度', () => {
        const data = [3,9,20,null,null,15,7]
        const tree = new BinaryTree(data)
        assert.strictEqual(minDepth(tree.root), 3)
    })
    it('先序和中序构建二叉树', () => {
        const preOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
        const postOrder = ['A', 'C', 'E', 'D', 'B', 'H', 'I', 'G', 'F']
        let tree = new BinaryTree(null, piBuildThree(preOrder, postOrder))
        BinaryTree.preOrderTraverse(tree.root, (val) => {
            console.log(val)
        })
    })
})
