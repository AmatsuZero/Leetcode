class LinkedListNode {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.count = 0
        this.head = null
    }

    append(element) {
        const node = new LinkedListNode(element)
        if (this.head === null)
            this.head = node
        else {
            let current = this.head
            //循环列表，直到找到最后一项
            while(current.next !== null)
                current = current.next
            //找到最后一项，将其next赋为node，建立链接
            current.next = node
        }
        this.count++
    }

    insert(position, element) {
        if (position < 0 || position > this.count) return false
        const node = new LinkedListNode(element)
        let current = this.head, previous, index = 0
        if (position === 0) { //添加到头结点
            node.next = current
            this.head = node
        } else {
            while (index++ < position) {
                previous = current
                current = current.next
            }
            node.next = current
            previous.next = node
            this.count++
        }
        return true
    }

    removeAt(position) {
        if (position < 0 || position >= this.count) return null
        let current = this.head, previous, index = 0
        if (position === 0)
            this.head = current.next
        else {
            while (index++ < position) {
                previous = current
                current = current.next
            }
            //将Previous和current的下一项链接起来，跳过current，从而移除它
            previous.next = current.next
        }
        this.count--
        return current.element
    }

    valueAt(index) {
        const node = this.nodeAt(index) !== undefined
        return node !== undefined ? node.element : undefined
    }

    nodeAt(index) {
        if (index < 0 || index > this.count) return undefined
        let node = this.head
        for (let i = 0; i < index && node !== null; i++)
            node = node.next
        return node
    }

    remove(element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }

    indexOf(element) {
        let current = this.head,
            index = 0
        while (current !== null) {
            if (element === current.element) return index
            index ++
            current = current.next
        }
        return -1
    }

    get isEmpty() {
        return this.count === 0
    }

    get size() {
        return this.count
    }

    get first() {
        return this.head.element
    }

    clear() {
        this.head = null
        this.count = 0
    }

    toString(separator = ' ') {
        let current = this.head,
            string = ''
        while (current !== null) {
            string += (string.length === 0 ? '' : separator) + current.element
            current = current.next
        }
        return string
    }

    static from(data) {
        console.log(this)
        const list = new this()
        data.forEach(value => list.append(value))
        return list
    }
}

module.exports = {
    LinkedList,
    LinkedListNode
}
