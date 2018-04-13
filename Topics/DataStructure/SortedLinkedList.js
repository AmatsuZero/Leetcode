const { LinkedList, LinkedListNode } = require('./LinkedList')

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
        for (; i < this.count && current; i++) {
            if (element < current.element)
                return i
            current = current.next
        }
        return i
    }

    deleteDuplicates() {
        if (!this.head)
            return this.head
        let val = this.head.element,
            p = this.head
        while (p && p.next) {
            if (p.next.element === val) {
                p.next = p.next.next
            } else {
                val = p.next.element
                p = p.next
            }
        }
        return this.head
    }

    deleteAllDuplicate() {
        if (!this.head)
            return this.head
        // 用一个dummy节点来当做head的prev
        let dummy = new LinkedListNode(0)
        dummy.next = this.head
        let prev = dummy
        let p = this.head
        while (p && p.next) {
            // 如果没有重复，则prev为p，next为p.next
            if (p.element !== p.next.element) {
                prev = p
                p = p.next
            } else { // 如果有重复，则继续遍历，直到不重复的节点
                const val = p.element
                let n = p.next.next
                while (n) {
                    if (n.element !== val)
                        break
                    n = n.next
                }
                // 删除重复节点
                prev.next = n
                p = n
            }
        }
        this.head = dummy.next
        return this.head
    }

    merge(...lists) {
        let n = lists.length
        if (n === 0) return
        if (n > 1) {
            while (n > 1) {
                const k = ~~((n+1)/2)
                for(let i = 0; i < ~~(n/2); i++) {
                    //合并i和i+k的链表，并放到i位置
                    lists[i].head = SortedLinkedList.merged(lists[i], lists[i+k])
                    // 下个循环只需要处理前K个链表了
                    n = k
                }
            }
        }
        let y = lists[0].head
        const arr = []
        while (y) {
            arr.push(y.element)
            y = y.next
        }
        this.head = SortedLinkedList.merged(this, lists[0])
    }

    static merged(listA, listB) {
        let dummy = new LinkedListNode(0),
            p = dummy,
            l1 = listA.head,
            l2 = listB.head
        while (l1 && l2) {
            const val1 = l1.element,
                val2 = l2.element
            // 哪个节点小，就挂载，同时移动到下一节点
            if (val1 < val2) {
                p.next = l1
                p = l1
                l1 = l1.next
            } else {
                p.next = l2
                p = l2
                l2 = l2.next
            }
        }
        // 这里处理还未挂载的节点
        if (l1)
            p.next = l1
        else
            p.next = l2
        return dummy.next
    }
}

module.exports = SortedLinkedList
