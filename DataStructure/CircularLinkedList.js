const { LinkedList, LinkedListNode } = require('./LinkedList')

class CircularLinkedList extends LinkedList {

    append(element) {
        const node = new LinkedListNode(element);
        let current;
        if (this.head === null)
            this.head = node
         else {
            current = this.nodeAt(this.count - 1)
            current.next = node
        }
        node.next = this.head
    }

    insert(index, element) {
        if (index >= 0 && index <= this.count) {
            const node = new LinkedListNode(element)
            let current = this.head
            if (index === 0) {
                if (this.head == null) {
                    // if no node  in list
                    this.head = node
                    node.next = this.head
                } else {
                    node.next = current;
                    current = this.nodeAt(this.count)
                    // update last element
                    this.head = node
                    current.next = this.head
                }
            } else {
                const previous = this.nodeAt(index - 1)
                node.next = previous.next
                previous.next = node
            }
            return true
        }
        return false
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head
            if (index === 0) {
                if (this.count === 1) {
                    this.head = undefined
                } else {
                    const removed = this.head
                    current = this.nodeAt(this.count - 1)
                    this.head = this.head.next
                    current.next = this.head
                    current = removed
                }
            } else {
                // no need to update last element for circular list
                const previous = this.nodeAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            return current.element
        }
        return undefined
    }
}

module.exports = CircularLinkedList
