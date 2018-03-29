const { LinkedList, LinkedListNode } = require('./LinkedList')

class DoublyLinkedListNode extends LinkedListNode {
    constructor(element) {
        super(element)
        this.prev = null
    }
}

class DoublyLinkedList extends LinkedList {
    constructor() {
        super()
        this.tail = this.head
    }

    append(element) {
        const node = new LinkedListNode(element)
        if (this.head === null) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            node.prev = this.tail
            this.tail = node
        }
        this.count++
    }

    insert(position, element) {
        if (position < 0 || position > this.count) return false
        const node = new DoublyLinkedListNode(element)
        let current = this.head
        if (position === 0) {
            if (this.head === null) {
                this.head = node
                this.tail = node
            } else {
                node.next = current
                current.prev = node
                this.head = node
            }
        } else if (position === this.count) {
            current = this.tail
            current.next = node
            node.prev = current
            this.tail = node
        } else {
            let previous, index = 0
            while (index++ < position) {
                previous = current
                current = current.next
            }
            node.next = current
            previous.next = node
            current.prev = node
            node.prev = previous
        }
        this.count++
        return true
    }

    removeAt(position ,element) {
        if (position < 0 || position >= this.count) return null
        let current = this.head
        if (position === 0) {
            this.head = current.next
            if (length === 1) // 如果只有一个元素，更新tail
                this.tail = null
            else
                this.head.prev = null
        } else if (position === this.count - 1) {
            current = this.tail
            this.tail = current.prev
            this.tail.next = null
        } else {
            let index = 0, previous
            while (index++ < position) {
                previous = current
                current = current.next
            }
            previous.next = current.next
            current.next.prev = previous
        }
        this.count--
        return current.element
    }

    get last() {
        return this.tail.element
    }
}

module.exports = DoublyLinkedList
