const Stack = require('../DataStructure/Stack')

module.exports = (root) => {
    const vals = []
    if (root === null) return vals
    const nodes = new Stack()
    let p = root
    while (p !== null || !nodes.isEmpty) {
        // 一直遍历左子树，将根节点压栈
        while (p !== null) {
            nodes.push(p)
            p = p.left
        }
        if (!nodes.isEmpty) {
            // 将根节点弹出，获取右子树
            p = nodes.pop()
            vals.push(p.val)
            p = p.right
        }
    }
    return vals
}
