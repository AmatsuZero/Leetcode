/*
Given a binary tree, flatten it to a linked list in-place.

For example, Given

         1
        / \
       2   5
      / \   \
     3   4   6

The flattened tree should look like:
   1
    \
     2
      \
       3
        \
         4
          \
           5
            \
             6
*/

const { TreeNode } = require('../DataStructure/BinaryTree')
const Stack = require('../DataStructure/Stack')

module.exports = (root) => {
    if (!root) return
    const ns = new Stack()
    let n = new TreeNode(0)
    ns.push(root)
    while (!ns.isEmpty) {
        const p = ns.pop()
        // 挂载到右子树
        n.right = p
        n = p
        // 右子树压栈
        if(p.right) {
            ns.push(p.right)
            p.right = null
        }
        // 左子树压栈
        if(p.left) {
            ns.push(p.left)
            p.left = null
        }
    }
}
