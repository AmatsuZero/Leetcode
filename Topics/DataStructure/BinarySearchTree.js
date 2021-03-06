const { TreeNode, BinaryTree } = require('./BinaryTree')

class BinarySearchTree extends BinaryTree {

    insert(key) {
        if (this._root == null) {
            this._root = new TreeNode(key)
        } else {
            this.insertNode(this._root, key)
        }
    }

    insertNode(node, key) {
        if (key < node.val) {
            if (node.left == null) {
                node.left = new TreeNode(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else if (node.right == null) {
            node.right = new TreeNode(key)
        } else {
            this.insertNode(node.right, key)
        }
    }

    search(key) {
        return this.searchNode(this._root, key)
    }

    searchNode(node, key) {
        if (node === null) {
            return false
        }
        if (key < node.val) {
            return this.searchNode(node.left, key)
        } else if (key > node.val) {
            return this.searchNode(node.right, key)
        }
        return true
    }

    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this._root, callback)
    }

    inOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.val)
            this.inOrderTraverseNode(node.right, callback)
        }
    }
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this._root, callback)
    }

    preOrderTraverseNode(node, callback) {
        if (node !== null) {
            callback(node.val)
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)
        }
    }

    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this._root, callback)
    }

    postOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.val)
        }
    }

    get min() {
        return this.minNode(this._root)
    }

    minNode(node) {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }

    get max() {
        return this.maxNode(this._root)
    }

    maxNode(node) {
        let current = node
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }

    remove(key) {
        this._root = this.removeNode(this._root, key)
    }

    removeNode(node, key) {
        if (node === null) {
            return null
        }
        if (key < node.val) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (key > node.val) {
            node.right = this.removeNode(node.right, key)
            return node
        }
        // key is equal to node.item
        // handle 3 special conditions
        // 1 - a leaf node
        // 2 - a node with only 1 child
        // 3 - a node with 2 children
        // case 1
        if (node.left === null && node.right === null) {
            node = null
            return node
        }
        // case 2
        if (node.left === null) {
            node = node.right
            return node
        } else if (node.right === null) {
            node = node.left
            return node
        }
        // case 3
        const aux = this.minNode(node.right)
        node.val = aux.key
        node.right = this.removeNode(node.right, aux.key)
        return node
    }

    static recover(root) {
    	let cur, pre, p1, p2, preCur,
		    found = false
	    if (!root) return
	    cur = root
	    while (cur) {
    		if (!cur.left) {
    			//記錄p1和p2
			    if (preCur && preCur.val > cur.val) {
			    	if (!found) {
			    		p1 = preCur
					    found = true
				    }
				    p2 = cur
			    }
			    preCur = cur
			    cur = cur.right
		    } else {
    			pre = cur.left
			    while (pre.right && pre.right !== cur)
			      pre = pre.right
			    if (!pre.right) {
    				pre.right = cur
				    cur = cur.left
			    } else {
    				//記錄p1和p2
				    if (preCur.val > cur.val) {
				    	if (!found) {
				    		p1 = preCur
						    found = true
					    }
					    p2 = cur
				    }
				    preCur = cur
				    pre.right = null
				    cur = cur.right
			    }
		    }
	    }
	    if (p1 && p2) {
    		const tmp = p1.val
		    p1.val = p2.val
		    p2.val = tmp
	    }
    }

    static valid(node, minVal, maxVal) {
        if(!node) return true
        if(node.val <= minVal || node.val >= maxVal) return false
        return this.valid(node.left, minVal, node.val) && this.valid(node.right, node.val, maxVal)
    }

    static isValidBST(root) {
        return this.valid(root, -Infinity, Infinity)
    }
}

module.exports = BinarySearchTree
