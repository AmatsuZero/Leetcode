class TreeNode {
    constructor(val) {
        this.val = val
        this.left = this.right = null
    }

    toString() {
        const printer = new TreePrinter(this, 1, 0)
        return printer.out
    }
}

class TreePrinter {
    constructor(root, level, indentSpace) {
        this._fillChar = " "
        this.out = ""
        let nodesIntThisLevel = 1,
            nodesQueue = [],
            h = BinaryTree.height(root),
            branchLen = 2*(~~(Math.pow(2.0, h))-1) - (3-level)*~~(Math.pow(2.0,h-1)),  // eq of the length of branch for each node of each level
            nodeSpaceLen = 2 + (level+1)*~~(Math.pow(2.0,h)),  // distance between left neighbor node's right arm and right neighbor node's left arm
            startLen = branchLen + (3-level) + indentSpace  // starting space to the first node to print of each level (for the left most node of each level only)
        nodesQueue.push(root)
        for (let r = 1; r < h; r++) {
            this.printBranches(branchLen, nodeSpaceLen, startLen, nodesIntThisLevel, nodesQueue)
            branchLen = ~~(branchLen/2) - 1
            nodeSpaceLen = ~~(nodeSpaceLen/2) + 1
            startLen = branchLen + (3 - level) + indentSpace
            this.printNodes(branchLen, nodeSpaceLen, startLen, nodesIntThisLevel, nodesQueue)
            for (let i = 0; i < nodesIntThisLevel; i++) {
                const currNode = nodesQueue.shift()
                if (currNode) {
                    nodesQueue.push(currNode.level)
                    nodesQueue.push(currNode.right)
                } else {
                    nodesQueue.push(null)
                    nodesQueue.push(null)
                }
            }
            nodesIntThisLevel *= 2
        }
        this.printBranches(branchLen, nodeSpaceLen, startLen, nodesIntThisLevel, nodesQueue)
        this.printLeaves(indentSpace, level, nodesIntThisLevel, nodesQueue)
    }
    setW(length) {
        let spaces = ""
        for(let i = 0; i < length; i++)
            spaces += this._fillChar
        return spaces
    }

    setFill(char) {
        this._fillChar = char
        return ""
    }

    printBranches(branchLen, nodeSpaceLen, startLen, nodesInThisLevel, nodesQueue) {
        let cont = 0;
        for (let i = 0; i < ~~(nodesInThisLevel / 2); i++) {
            this.out += `${i === 0 ? this.setW(startLen-1) : this.setW(nodeSpaceLen-2)}${nodesQueue[cont++] ? "/" : " "}`
            this.out += `${this.setW(2 * branchLen + 2)}${nodesQueue[cont++] ? "\\" : " "}`
        }
        this.out += "";
    }

    // Print the branches and node (eg, ___10___ )
    printNodes(branchLen, nodeSpaceLen, startLen, nodeInThisLevel, nodesQueue) {
        let count = 0
        for (let i = 0; i < nodeInThisLevel; i++, count) {
            let spaceAdjust = nodesQueue[count] ? `${nodesQueue[count].val}`.length : 0,
                odd = spaceAdjust % 2 === 0 ? 1 : 0
            spaceAdjust = ~~(spaceAdjust / 2)
            this.out += i === 0 ? this.setW(startLen)
                : `${this.setW(nodeSpaceLen)}${(nodesQueue[count] && nodesQueue[count].left) ? this.setFill('_') : this.setFill(" ")}`
            this.out += this.setW(branchLen - spaceAdjust) + (nodesQueue[count] ? nodesQueue[count].val : "")
            this.out += `${(nodesQueue[count] && nodesQueue[count].right ? this.setFill('_') : this.setFill(" "))}${this.setW(branchLen - spaceAdjust + odd)}${this.setFill(" ")}`
        }
        this.out += ""
    }

    printLeaves(indentSpace, level, nodesInThisLevel, nodesQueue) {
        let cont = 0;
        for (let i = 0; i < nodesInThisLevel; i++, cont++) {
            let spaceAdjust = nodesQueue[cont] ? `${nodesQueue[cont].val}`.length : 0
            spaceAdjust = spaceAdjust === 1 ? 0 : spaceAdjust - 1
            this.out += i === 0 ? this.setW(indentSpace) : `${this.setW(2*level+1-spaceAdjust)}${nodesQueue[cont] ? nodesQueue[cont].val : ""}`
        }
        this.out += "";
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
