/*
* Given n, generate all structurally unique BST's (binary search trees) that store values 1...n.

For example, Given n = 3, your program should return all 5 unique BST's shown below.

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
* */
const { TreeNode } = require("../DataStructure/BinaryTree")

const generate = (start, stop) => {
    const vs = []
    if (start > stop) {
        // 没有子树了，返回null
        vs.push(null)
        return vs
    }
    for (let i = start; i <= stop; i++) {
        const l = generate(start, i-1)
        const r = generate(i+1, stop)
        // 获取左子树和右子树所有排列之后，放到root位i的节点的下面
        for (let j = 0; j < l.length; j++) {
            for (let k = 0; k < r.length; k++) {
                const n = new TreeNode(i)
                n.left = l[j]
                n.right = r[k]
                vs.push(n)
            }
        }
    }
    return vs
}

module.exports = n => generate(1, n)
