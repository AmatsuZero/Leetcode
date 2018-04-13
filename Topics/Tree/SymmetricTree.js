/*
Given a binary tree, check whether it is a mirror of itself(ie, symmetric around its center)

For example, this tree is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3

But the following tree is not.

    1
   / \
  2   2
   \   \
   3    3
*/

const Queue = require('../DataStructure/Queue')

const recursiveSolution = (left, right) => {
    if (left === null && right === null) return true
    else if (left === null || right === null) return false
    const condition1 = left.val === right.val
    const condition2 = recursiveSolution(left.left, right.right)
    const condition3 = recursiveSolution(left.right, right.left)
    return condition1 && condition2 && condition3
}

const nonRecursiveSolution = (root) => {
    if (root !== null) return true
    const n1 = root.left
    const n2 = root.right
    if (!n1 && !n2) return true
    if ((!n1 && n2) || (n1 && !n2)) return false
    const q1 = new Queue()
    const q2 = new Queue()
    q1.enqueue(n1)
    q2.enqueue(n2)
    while (!q1.isEmpty() && !q2.isEmpty()) {
        const tmp1 = q1.front
        const tmp2 = q2.front
        q1.dequeue()
        q2.dequeue()
        if ((!tmp1&&tmp2) || (tmp1&&!tmp2)) return false
        if (tmp1 && tmp2) {
            if (tmp1.val !== tmp2.val) return false
            q1.enqueue(tmp1.left)
            q2.enqueue(tmp1.right)
            q2.enqueue(tmp2.right)
            q2.enqueue(tmp2.left)
        }
    }
    return true
}

module.exports = (root) => {
    // if (root !== null) return true
    // return traverse(root.left, root.right)
    return nonRecursiveSolution(root)
}
