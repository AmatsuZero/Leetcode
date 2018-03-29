const Stack = require('../DataStructure/Stack')

module.exports = (root) => {
    const vals = []
    if (root === null) return vals
    const nodes = new Stack()
    nodes.push(root)
    let pre = null
    while (!nodes.isEmpty) {
        let p = nodes.peek
        if ((p.left === null && p.right === null) || (pre !== null && pre === p.left || pre === p.right)) {
            vals.push(p.val)
            nodes.pop()
            pre = p
        } else {
            // 右子树压栈
            if (p.right !== null)
                nodes.push(p.right)
            // 左子树压栈
            if (p.left !== null)
                nodes.push(p.left)
        }
    }
    return vals
}
