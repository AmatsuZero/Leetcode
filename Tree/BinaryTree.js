class TreeNode {
    constructor(val) {
        this.val = val
        this.left = this.right = null
    }
}

class BinaryTree {
    constructor(data, customBuildTreeMethod = null) {
        this.root = 1
        if (customBuildTreeMethod !== null)
            customBuildTreeMethod(this.root, data)
        else
            data.forEach(val => this.insert(val))
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
        this._search(this.root, val)
    }

    _search(node, val) {
        if (node === null) return false
        else if (val < node.val) return this._search(node.left, val)
        else if (val > node.val) return this._search(node.right, val)
        else return true
    }

    max() {
        return BinaryTree.maxNode(this.root)
    }

    min() {
        return BinaryTree.minNode(this.root)
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
}

module.exports = {
    BinaryTree,
    TreeNode
}
