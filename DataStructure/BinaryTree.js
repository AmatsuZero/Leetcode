class TreeNode {
    constructor(val) {
        this.val = val
        this.left = this.right = null
    }
}

class BinaryTree {
    constructor(customBuildTreeMethod = null, array1, array2) {
        this.root = null
        if (customBuildTreeMethod !== null)
            this.root = customBuildTreeMethod(array1, array2)
    }

    insert(val) {
        if (val === null) return
        const node = new TreeNode(val)
        if (this.root === null)
            this.root = node
        else
            this._insert(this.root, node)
    }

    _insert(node, newNode) {
        if (newNode.val < node.val) {
            if (node.left === null)
                node.left = newNode
            else
                this._insert(node.left, newNode)
        } else {
            if (node.right === null)
                node.right = newNode
            else
                this._insert(node.right, newNode)
        }
    }

    get height() {
        return BinaryTree.height(this.root)
    }

    remove(val) {
        this._remove(this.root, val)
    }

    _remove(node, key) {
        if (node === this.root) return null
        if (key < node.val) {
            node.left = this._remove(node.left, key)
        } else if (key > node.val) {
            node.right = this._remove(node.right, key)
        } else {
            if (node.left === null && node.right === null) {
                node = null
            } else if (node.left === null) {
                node = node.right
            } else if (node.right === null) {
                node = node.left
            } else {// 有两个子节点
                // 首先加入辅助节点，同时找寻右子节点中的最小节点
                // 并把当前节点替换为右子节点中的最小节点
                // 同时为了避免节点重复，移除右子节点中的最小节点
                const aux = BinaryTree.minNode(node.right)
                node.val = aux.val
                node.right = this._remove(node.right, aux.val)
            }
        }
        return node
    }

    search(val) {
       return this._search(this.root, val)
    }

    _search(node, val) {
        if (node === null) return false
        else if (val < node.val) return this._search(node.left, val)
        else if (val > node.val) return this._search(node.right, val)
        else return true
    }

    revert() {
        this.root = BinaryTree.invert(this.root)
    }

    get max() {
        return BinaryTree.maxNode(this.root)
    }

    get min() {
        return BinaryTree.minNode(this.root)
    }

    inOrderTraverse(cb) {
        BinaryTree.inOrderTraverse(this.root, cb)
    }

    preOrderTraverse(cb) {
        BinaryTree.preOrderTraverse(this.root, cb)
    }

    static maxNode(node) {
        if (node !== null) {
            while (node !== null && node.right !== null) node = node.right
            return node.val
        }
        return node.val
    }

    static minNode(node) {
        if (node !== null) {
            while (node !== null && node.left !== null) node = node.left
            return node.val
        }
        return node.val
    }

    static inOrderTraverse(node, cb) {
        if (node === null) return
        this.inOrderTraverse(node.left, cb)
        cb(node.val)
        this.inOrderTraverse(node.right, cb)
    }

    static preOrderTraverse(node, cb) {
        if (node === null) return
        cb(node.val)
        this.preOrderTraverse(node.left, cb)
        this.preOrderTraverse(node.right, cb)
    }

    static invert(root) {
        if (root === null) return root
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
        if (root === null) return 0
        const left = this.height(root.left)
        const right = this.height(root.right)
        return Math.max(left, right) + 1
    }
}

module.exports = {
    BinaryTree,
    TreeNode
}
