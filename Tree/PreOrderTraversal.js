/*
Given a binary tree, return the preorder traversal of its nodes' values.

For example: Given binary tree {1,#,2,3},

   1
    \
     2
    /
   3
return [1,2,3].

Note: Recursive solution is trivial, could you do it iteratively?
* */

const Stack = require('../DataStructure/Stack')

module.exports = (root) => {
    const vals = []
    if (root === null) return vals
    const nodes = new Stack()
    // 将Root压栈
    nodes.push(root)
    while (nodes.size !== 0) {
        let n = nodes.peek
        vals.push(n.val)
        // 访问了该节点，出栈
        nodes.pop()
        // 如果有右子树，压栈保存
        if (n.right !== null)
            nodes.push(n.right)
        // 如果有左子树，压栈保存
        if (n.left !== null)
            nodes.push(n.left)
    }
}
