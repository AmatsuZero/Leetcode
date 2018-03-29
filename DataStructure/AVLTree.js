const BinarySearchTree = require('./BinarySearchTree')
const { TreeNode } = require('./BinaryTree')

class BalanceFactor {
    constructor(value) {
        this._rawValue = Symbol.for(value)
    }
    isEqual(rhs) {
        if (!(rhs instanceof BalanceFactor)) return false
        return Symbol.keyFor(this._rawValue) === Symbol.keyFor(rhs._rawValue)
    }
}

BalanceFactor.UNBALANCED_RIGHT = new BalanceFactor(-2)
BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT = new BalanceFactor(-1)
BalanceFactor.BALANCED = new BalanceFactor(0)
BalanceFactor.SLIGHTLY_UNBALANCED_LEFT = new BalanceFactor(1)
BalanceFactor.UNBALANCED_LEFT = new BalanceFactor(2)

class AVLTree extends BinarySearchTree {

    /**
     * Left left case: rotate right
     *
     *       b                           a
     *      / \                         / \
     *     a   e -> rotationLL(b) ->   c   b
     *    / \                             / \
     *   c   d                           d   e
     *
     * @param node Node<T>
     */
    static rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }
    /**
     * Right right case: rotate left
     *
     *     a                              b
     *    / \                            / \
     *   c   b   -> rotationRR(a) ->    a   e
     *      / \                        / \
     *     d   e                      c   d
     *
     * @param node Node<T>
     */
    static rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }
    /**
     * Left right case: rotate left then right
     * @param node Node<T>
     */
    static rotationLR(node) {
        node.left = AVLTree.rotationRR(node.left);
        return AVLTree.rotationLL(node);
    }
    /**
     * Right left case: rotate right then left
     * @param node Node<T>
     */
    static rotationRL(node) {
        node.right = AVLTree.rotationLL(node.right);
        return AVLTree.rotationRR(node);
    }

    static balanceType(node) {
        const heightDifference = node.left.height - node.right.height
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }

    insertNode(node, key) {
        if (node === null) return new TreeNode(key)
        if (key < node.val)
            node.left = this.insertNode(node, key)
        else if (key > node.val)
            node.right = this.insertNode(node, key)
        else
            return node

        const balancedFactor = AVLTree.balanceType(node)
        if (balancedFactor.isEqual(BalanceFactor.UNBALANCED_LEFT)) {
            if (key < node.left.val)
                node = AVLTree.rotationLL(node)
            else
                return AVLTree.rotationLR(node)
        }
        if (balancedFactor.isEqual(BalanceFactor.UNBALANCED_RIGHT)) {
            if (key < node.right.key)
                node = AVLTree.rotationRR(node)
            else
                return AVLTree.rotationRL(node)
        }
        return node
    }

    removeNode(node, key) {
        node = super.removeNode(node, key)
        if (node === null) return node
        const balancedFactor = AVLTree.balanceType(node)
        if (balancedFactor.isEqual(BalanceFactor.UNBALANCED_LEFT)) {
            const type = AVLTree.balanceType(node.left)
            if (type.isEqual(BalanceFactor.BALANCED) || type.isEqual(BalanceFactor.SLIGHTLY_UNBALANCED_LEFT))
                return AVLTree.rotationLL(node)
            else if (type.isEqual(BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT))
                return AVLTree.rotationLR(node.left)
        }
        if (balancedFactor.isEqual(BalanceFactor.UNBALANCED_RIGHT)) {
            const type = AVLTree.balanceType(node.right)
            if (type.isEqual(BalanceFactor.BALANCED) || type.isEqual(BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT))
                return AVLTree.rotationRR(node)
            else if (type.isEqual(BalanceFactor.SLIGHTLY_UNBALANCED_LEFT))
                return AVLTree.rotationRL(node.right)
        }
        return node
    }
}

module.exports = AVLTree
