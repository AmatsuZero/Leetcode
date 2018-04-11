/*
* A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.

Return a deep copy of the list.
* */

const { LinkedListNode, LinkedList } = require("./LinkedList")

class RandomNode extends LinkedListNode {
    constructor() {
        super()
        this.label = null
        this.random = null
    }
}

module.exports = head => {
    if(!this.head)
        return null
    const dummy = new RandomNode(0)
    let n = dummy,
        h = this.head,
        m = new WeakMap()
    while (h) {
        const node = new RandomNode(h.label)
        n.next = node
        n = node
        node.random = h.random
        m.set(h, node)
        h = h.next
    }
    h = dummy.next
    while (h) {
        if (h.random)
            h.random = m.get(h.random)
        h = h.next
    }
    return dummy.next
}
