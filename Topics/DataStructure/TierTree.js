class TierTreeNode {
    constructor() {
        this.father = null
        this.child = []
        this.keepChar = null
        this.isWord = false
    }
    get content() {
        return this.child.reduce((a, b) => String.fromCharCode(a.keepChar) + String.fromCharCode(b.keepChar))
    }
}

class TierTree {

    constructor(data = []) {
        this._root = new TierTreeNode()
        data.forEach(word => this.insert(word))
    }

    get root() {
        return this._root
    }

    insert(word) {
        TierTree._insert(word, this._root)
    }

    search(word) {
        return TierTree._search(word, this._root)
    }

    delete(word) {
        return TierTree._delete(word, this._root)
    }

    static _search(currentWord, currentNode) {
        if (currentWord.length > 0) {
            const firstChar = currentWord.charCodeAt(0),
                childNode = currentNode.child
            if (childNode.length === 0) return false
            let isInChildNode = false
            for (let node of childNode) {
                if (firstChar === node.keepChar) {
                    isInChildNode = true
                    return this._search(currentWord.slice(1), node)
                }
            }
            if (!isInChildNode) return false
        } else
            return currentNode.isWord
    }

    static _insert(currentWord, currentNode) {
        if (currentWord.length > 0) {
            const firstChar = currentWord.charCodeAt(0),
                childNode = currentNode.child
            let isInChildNode = false
            for (let node of childNode) {
                if (firstChar === node.keepChar) {
                    isInChildNode = true
                    this._insert(currentWord.slice(1), node)
                    break
                }
            }
            if (!isInChildNode)
                this._insertWithNewNode(currentWord, currentNode)
        } else
            currentNode.isWord = true
    }

    static _insertWithNewNode(currentWord, currentNode) {
        const firstChar = currentWord.charCodeAt(0)
        const newNode = new TierTreeNode()
        newNode.keepChar = firstChar
        newNode.father = currentNode
        currentNode.child.push(newNode)
        const content = currentWord.slice(1)
        if (content.length > 0)
            this._insertWithNewNode(content, newNode)
        else
            newNode.isWord = true
    }

    static _delete(currentWord, currentNode) {
        if (currentWord.length > 0) {
            const firstChar = currentWord.charCodeAt(0),
                childNode = currentNode.child
            if (childNode.length === 0) return false
            let isInChildNode = false
            for (let node of childNode) {
                if (firstChar === node.keepChar) {
                    isInChildNode = true
                    return this._delete(currentWord.slice(1), node)
                }
            }
            if (!isInChildNode) return false
        } else {
            if (currentNode.child.length > 0)
                currentNode.isWord = false
            else {
                const index = currentNode.father.child.indexOf(currentWord)
                currentNode.father.child.splice(index, 1)
            }
            return true
        }
        return false
    }
}

module.exports = TierTree
