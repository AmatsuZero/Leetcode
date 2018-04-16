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
}

module.exports = {
    BinaryTree,
    TreeNode
}
