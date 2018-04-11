/*
* You are given two linked lists representing two non-negative numbers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)

Output: 7 -> 0 -> 8
* */
const { LinkedListNode, LinkedList } = require("./LinkedList")

module.exports = (l1, l2) => {
    let dummy = new LinkedListNode(0),
        p = dummy,
        cn = 0
    while (l1 || l2) {
        let val = cn + (l1 ? l1.element : 0) + (l2 ? l2.element : 0)
        cn = ~~(val / 10)
        val = ~~(val % 10)
        p.next = new LinkedListNode(val)
        p = p.next
        if (l1)
            l1 = l1.next
        if (l2)
            l2 = l2.next
    }
    if (cn !== 0) {
        p.next = new LinkedListNode(cn)
        p = p.next
    }
    const list = new LinkedList()
    list.head = dummy.next
    return list
}
