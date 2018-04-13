const {TreeNode} = require('./BinaryTree')
const AVLTree = require('./AVLTree')

class RBNode extends TreeNode {
    constructor(val) {
        super(val)
        this.isRed = false
        this.parent = null
    }
}

class RBTree extends AVLTree {
    /*
     * 对红黑树的节点(x)进行左旋转
     *
     * 左旋示意图(对节点x进行左旋)：
     *      px                              px
     *     /                               /
     *    x                               y
     *   /  \      --(左旋)-->           / \                #
     *  lx   y                          x  ry
     *     /   \                       /  \
     *    ly   ry                     lx  ly
     *
     *
    */
    leftRotate(root, x) {
        // 设置x的右孩子为y
        const y = x.right
        // 将 “y的左孩子” 设为 “x的右孩子”；
        // 如果y的左孩子非空，将 “x” 设为 “y的左孩子的父亲”
        x.right = y.left
        if (y.left !== null)
            y.left.parent = x
        // 将 “x的父亲” 设为 “y的父亲”
        y.parent = x.parent
        if (x.parent === null) // 如果 “x的父亲” 是空节点，则将y设为根节点
            root = y
        else {
            if (x.parent.left === x) // 如果 x是它父节点的左孩子，则将y设为“x的父节点的左孩子”
                root = y
            else // 如果 x是它父节点的左孩子，则将y设为“x的父节点的左孩子”
                x.parent.right = y
        }
        y.left = x // 将 “x” 设为 “y的左孩子”
        x.parent = y
        return root
    }

    /*
     * 对红黑树的节点(y)进行右旋转
     *
     * 右旋示意图(对节点y进行左旋)：
     *            py                               py
     *           /                                /
     *          y                                x
     *         /  \      --(右旋)-->            /  \                     #
     *        x   ry                           lx   y
     *       / \                                   / \                   #
     *      lx  rx                                rx  ry
     *
     */
    rightRotate(root, y) {
        // 设置x是当前节点的左孩子。
        const x = y.left
        // 将 “x的右孩子” 设为 “y的左孩子”；
        // 如果"x的右孩子"不为空的话，将 “y” 设为 “x的右孩子的父亲”
        y.right = x.left
        if (x.right !== null)
            x.right.parent = y
        // 将 “y的父亲” 设为 “x的父亲”
        x.parent = y.parent
        if (y.parent === null) // 如果 “y的父亲” 是空节点，则将x设为根节点
            root = x
        else {
            if (y === y.parent.left) // 如果 y是它父节点的右孩子，则将x设为“y的父节点的右孩子”
                y.parent.right = x
            else  // (y是它父节点的左孩子) 将x设为“x的父节点的左孩子”
                y.parent.left = x
        }
        // 将 “y” 设为 “x的右孩子”
        x.right = y
        // 将 “y的父节点” 设为 “x”
        y.parent = x
        return root
    }

    insert(key) {
        if (this._root == null) {
            this._root = new RBNode(key)
        } else {
            this.insertNode(this._root, key)
        }
    }

    insertNode(root, key) {
        let node = new RBNode(key)
        let x = root, y
        // 1. 将红黑树当作一颗二叉查找树，将节点添加到二叉查找树中。
        while (x !== null) {
            y = x
            if (node.val < x.val)
                x = x.left
            else
                x = x.right
        }
        node.parent = y
        if (y !== null) {
            if (node.val < y.val)
                y.left = node
            else
                y.right = node
        } else
            root = node
        // 2. 设置节点的颜色为红色
        node.isRed = true
        // 3. 将它重新修正为一颗二叉查找树
        this.insertFixUp(root, node)
    }

    insertFixUp(root, node) {
        let parent = node.parent, gparent
        // 若“父节点存在，并且父节点的颜色是红色”
        while (parent !== null && parent.isRed) {
            gparent = parent.parent
            //若“父节点”是“祖父节点的左孩子”
            if (parent === gparent.left) { // Case 1条件：叔叔节点是红色
                let uncle = gparent.right
                if (uncle !== null && uncle.isRed) {
                    uncle.isRed = false
                    parent.isRed = false
                    gparent.isRed = true
                    node = gparent
                    continue
                } else if (parent.right === node) { // Case 2条件：叔叔是黑色，且当前节点是右孩子
                    let tmp
                    root = this.leftRotate(root, parent)
                    tmp = parent
                    parent = node
                    node = tmp
                }
                // Case 3条件：叔叔是黑色，且当前节点是左孩子
                parent.isRed = false
                gparent.isRed = true
                root = this.rightRotate(root, gparent)
            } else {//若“z的父节点”是“z的祖父节点的右孩子”
                // Case 1条件：叔叔节点是红色
                let uncle = gparent.left
                if (uncle !== null && uncle.isRed) {
                    uncle.isRed = false
                    parent.isRed = false
                    gparent.isRed = true
                    node = gparent
                    continue
                } else if (parent.left === node) {
                    root = this.rightRotate(root, parent)
                    let tmp = parent
                    parent = node
                    node = tmp
                }
                // Case 3条件：叔叔是黑色，且当前节点是右孩子。
                parent.isRed = false
                gparent.isRed = true
                root = this.leftRotate(root, gparent)
            }
        }
        // 将根节点设为黑色
        root.isRed = false
    }

    removeNode(root, key) {
        let child, parent,
            color = false
        const node = new RBNode(key)
        // 被删除节点的"左右孩子都不为空"的情况。
        if (node.left !== null && node.right !== null) {
            // 被删节点的后继节点。(称为"取代节点")
            // 用它来取代"被删节点"的位置，然后再将"被删节点"去掉。
            let replace = node
            // 获取后继节点
            replace =replace.right
            while (replace.left !== null)
                replace = replace.left
            // "node节点"不是根节点(只有根节点不存在父节点)
            if (node.parent !== null) {
                if (node.parent.left === node)
                    node.parent.left = replace
                else
                    node.parent.right = replace
            } else  // "node节点"是根节点，更新根节点。
                root = replace
            // child是"取代节点"的右孩子，也是需要"调整的节点"。
            // "取代节点"肯定不存在左孩子！因为它是一个后继节点。
            child = replace.right
            parent = replace.parent
            // 保存"取代节点"的颜色
            color = replace.isRed
            // "被删除节点"是"它的后继节点的父节点"
            if (parent === node)
                parent = replace
            else {
                if (child !== null)
                    child.parent = parent
                parent.left = child
                replace.right = node.right
                node.right.parent = replace
            }
            replace.parent = node.parent
            replace.isRed = node.isRed
            replace.left = node.left
            node.left.parent = replace
            if (!color)
                this.removeFixUp(root, child, parent)
        } else {
            if (node.left !== null)
                child = node.left
            else
                child = node.right
            parent = node.parent
            // 保存"取代节点"的颜色
            color = node.isRed
            if (child !== null)
                child.parent = parent
            // "node节点"不是根节点
            if (parent !== null) {
                if (parent.left === node)
                    parent.left = child
                else
                    parent.right = child
            } else
                root = child
            if (!color)
                this.removeFixUp(root, child, parent)
        }
    }

    removeFixUp(root, node, parent) {
        let other
        while (node === null || !node.isRed && node !== root) {
            if (parent.left === node) {
                other = parent.right
                if (other.isRed) { //Case 1: x的兄弟w是红色的
                    other.isRed = false
                    parent.isRed = true
                    root = this.leftRotate(root, parent)
                    other = parent.right
                }
                if ((other.left === null || !other.left.isRed) &&
                    (other.right === null || !other.right.isRed)) {
                    // Case 2: x的兄弟w是黑色，且w的俩个孩子也都是黑色的
                    other.isRed = true
                    node = parent
                    parent = node.parent
                } else {
                    // Case 3: x的兄弟w是黑色的，并且w的左孩子是红色，右孩子为黑色。
                    if (other.right === null || !other.right.isRed) {
                        other.left.isRed = false
                        other.isRed = true
                        root = this.rightRotate(root, other)
                        other = parent.right
                    }
                    // Case 4: x的兄弟w是黑色的；并且w的右孩子是红色的，左孩子任意颜色。
                    other.isRed = parent.isRed
                    parent.isRed = false
                    other.right.isRed = false
                    root = this.leftRotate(root, parent)
                    node = root
                    break
                }
            } else {
                other = parent.left
                if (other.isRed) { // Case 1: x的兄弟w是红色的
                    other.isRed = false
                    parent.isRed = true
                    root = this.rightRotate(root, parent)
                    other = parent.left
                }
                if ((other.left === null || !other.left.isRed) &&
                    (other.right === null || !other.right.isRed)) {
                    // Case 2: x的兄弟w是黑色，且w的俩个孩子也都是黑色的
                    other.isRed = true
                    node = parent
                    parent = node.parent
                } else {
                    if (other.left === null || !other.left.isRed) {
                        // Case 3: x的兄弟w是黑色的，并且w的左孩子是红色，右孩子为黑色。
                        other.right.isRed = false
                        other.isRed = true
                        root = this.leftRotate(other)
                        other = parent.left
                    }
                    // Case 4: x的兄弟w是黑色的；并且w的右孩子是红色的，左孩子任意颜色。
                    other.isRed = parent.isRed
                    parent.isRed = false
                    other.left.isRed = false
                    root = this.rightRotate(root, parent)
                    node = root
                    break
                }
            }
        }
        if (node !== null)
            node.isRed = false
    }
}

module.exports = RBTree
