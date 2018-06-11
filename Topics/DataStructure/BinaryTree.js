class TreeNode {
    constructor(val) {
        this.val = val
        this.weakMap = new WeakMap() // 利用WeakMaP，防止内存泄漏
        this.leftKey = {left: "left"}
        this.rightKey = {right: "right"}
    }

    set left(val) {
        this.weakMap.set(this.leftKey, val)
    }

    set right(val) {
        this.weakMap.set(this.rightKey, val)
    }

    get left() {
        return this.weakMap.get(this.leftKey)
    }

    get right() {
        return this.weakMap.get(this.rightKey)
    }

    get nextInOrder() {
        if (this.right) {
            let node = this.right
            while (node.left)
                node = node.left
            return node
        } else {
            let pNode = this
            while (pNode.next) {
                const parent = pNode.next
                if (parent.left === pNode)
                    return parent
                pNode = pNode.next
            }
        }
        return null
    }

    swap() {
        const t = this.left
        this.left = this.right
        this.right = t
    }
}

const loopPrint = (char, number) => {
    let str = '';
    for (let start = 0; start < number; start++) {
        str += '_';
    }
    return str
}

class BinaryTree {
    constructor(customBuildTreeMethod = null, array1, array2) {
        this.root = null
        if (customBuildTreeMethod)
            this.root = customBuildTreeMethod(array1, array2)
    }

    get height() {
        return BinaryTree.height(this.root)
    }

    mirror() {
        if (!this.root) return
        this.root.swap()
        if (this.root.left)
            this.root.left.swap()
        if (this.root.right)
            this.root.right.swap()
    }

    revert() {
        this.root = BinaryTree.invert(this.root)
    }

    /*
    * 是否包含子树
    * */
    contain(root2) {
        let hasSubtree = false
        if (!this.root && !root2) {
            // 判断根节点是否包含子树
            if (this.root.val === root2.val) {
                hasSubtree = BinaryTree.contains(this.root, root2)
            }
            // 判断左孩子
            if (!hasSubtree)
                hasSubtree = BinaryTree.contains(this.root.left, root2)
            // 判断右孩子
            if (!hasSubtree)
                hasSubtree = BinaryTree.contains(this.root.r, root2)
        }
        return hasSubtree
    }

    static contains(root1, root2) {
        // 临界条件
        if (!root2) return true // 树2遍历结束
        if (!root1) return false // 树1遍历结束，树1遍历还没结束
        if (root2.val !== root1.val) return false // 存在对应节点不相等的情况
        // 递归
        return this.contains(root1.left, root2.left) && this.contains(root1.right, root2.right)
    }

    get max() {
        return BinaryTree.maxNode(this.root)
    }

    get min() {
        return BinaryTree.minNode(this.root)
    }

    get diameter() {// 对于每一个结点，经过它的最长路径的长度 = 它的左子树的最大深度 + 右子树的最大深度。
        let max = 0
        const maxDepth = root => {
            if (!root)
                return 0
            const l = maxDepth(root.left)
            const r = maxDepth(root.right)
            max = Math.max(max, l + r)
            return Math.max(l, r) + 1
        }
        maxDepth(this.root)
        return max
    }

    inOrderTraverse(cb) {
        BinaryTree.inOrderTraverse(this.root, cb)
    }

    preOrderTraverse(cb) {
        BinaryTree.preOrderTraverse(this.root, cb)
    }

    static maxNode(node) {
        if (node) {
            while (node && node.right) node = node.right
            return node.val
        }
        return node.val
    }

    static minNode(node) {
        if (node) {
            while (node && node.left) node = node.left
            return node.val
        }
        return node.val
    }

    static inOrderTraverse(node, cb) {
        if (!node) return
        this.inOrderTraverse(node.left, cb)
        cb(node)
        this.inOrderTraverse(node.right, cb)
    }

    static preOrderTraverse(node, cb) {
        if (!node) return
        cb(node)
        this.preOrderTraverse(node.left, cb)
        this.preOrderTraverse(node.right, cb)
    }

    static invert(root) {
        if (!root) return root
        else {
            const temp = root.left
            root.left = root.right
            root.right = temp
        }
        this.invert(root.left)
        this.invert(root.right)
        return root
    }

    static height(root) {
        if (!root) return 0
        const left = this.height(root.left)
        const right = this.height(root.right)
        return Math.max(left, right) + 1
    }

    /*
    是否是对称数
    */
    static isSymmetric(root) {
        if (!root) return true
        return this._isSymmetric(root.left, root.right)
    }

    static _isSymmetric(root1, root2) {
        if (!root1 && !root2) return true
        if (!root1 || !root2) return false // 只有一者为空，返回false
        if (root1.val !== root2.val) return false // 两者均不为null，两者的值不相等
        return this._isSymmetric(root1.left, root2.right) && this._isSymmetric(root1.right, root2.left)
    }

    toString() {
      let output = ''
      const depth = this.height
      for (let j = 0; j < depth; j++) {
          const w = 1 << (depth - j + 1)
          if (j === 0)
              output += `${loopPrint('_', w)}\n`;
          else {
            for (let i = 0; i < 1 << (j-1); i++) {
                output += `${loopPrint(' ', w+1)}`
                for (let k = 0; k < w-3; k++)
                    output += '_'
                output += '/ \\'
                for (let k = 0; k < w - 3; k++)
                    output += '_'
                output += loopPrint(' ', w+2)
            }
            output += '\n'
            for (let i = 0; i < 1 << (j - 1); i++)
                output += `${loopPrint('_', w)}/${loopPrint('\\', w*2-1)}_${loopPrint(' ', w)}`
            output += '\n'
          }
          for (let i = 0; i < 1 << j; i++)
              output += `${loopPrint('(', w-1)}_)${loopPrint(' ', w-1)}`
          output += '\n'
      }
      return output
    }
}

module.exports = {
    BinaryTree,
    TreeNode
}
