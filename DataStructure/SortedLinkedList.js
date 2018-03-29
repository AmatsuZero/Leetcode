const { LinkedList } = require('./LinkedList')

class SortedLinkedList extends LinkedList {

    append(element) {
        if (this.isEmpty) {
            super.append(element)
        } else {
            const index = this.indexOfNextSortedElement(element)
            super.insert(index, element)
        }
    }

    insert(position, element) {
        if (this.isEmpty)
            return super.insert(position, element)
        const pos = this.indexOfNextSortedElement(element)
        return super.insert(pos, element)
    }

    indexOfNextSortedElement(element) {
        let current = this.head
        let i = 0
        for (; i < this.size && current !== null; i++) {
            if (element < current.element)
                return i
            current = current.next
        }
        return i
    }
}

module.exports = SortedLinkedList
