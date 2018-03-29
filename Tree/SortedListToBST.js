/*
Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.
* */

const { TreeNode } = require('../DataStructure/BinaryTree')

const build = (start, end) => {
    if (start === end) return null
    let fast = start
    let slow = start
    while (fast !== end && fast.next !== end) {
        slow = slow.next
        fast = fast.next.next
    }
    const node = new TreeNode(slow.element)
    node.left = build(start, slow)
    node.right = build(slow.next, end)
    return node
}

module.exports = (head) => {
    return build(head, null)
}
