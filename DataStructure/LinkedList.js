class LinkedListNode {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
    }

    append(element) {
        const node = new LinkedListNode(element)
        if (!this.head)
            this.head = node
        else {
            let current = this.head
            //循环列表，直到找到最后一项
            while(current.next !== null)
                current = current.next
            //找到最后一项，将其next赋为node，建立链接
            current.next = node
        }
    }

    insert(position, element) {
        if (position < 0 || position > this.count) return false
        const node = new LinkedListNode(element)
        let current = this.head,
            previous,
            index = 0
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
        return current.element
    }

    valueAt(index) {
        const node = this.nodeAt(index)
        return node ? node.element : undefined
    }

    nodeAt(index) {
        if (index < 0 || index > this.count-1) return undefined
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

    get count() {
        let p = this.head,
            count = 0
        while (p) {
            count++
            p = p.next
        }
        return count
    }

    get first() {
        return this.head.element
    }

    rotateRight(k) {
        if(!this.head || k === 0) return this.head
        let p = this.head,
            n = 1
        // 得到链表长度
        while (p.next) {
            p = p.next
            n++
        }
        k = n - ~~(k % n)
        // 链接成环
        p.next = this.head
        for (let i = 0; i < k; i++)
            p = p.next
        // 得到新的链表并断开环
        this.head = p.next
        p.next = null
        return this.head
    }

    clear() {
        this.head = null
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

    toArray() {
        const ret = []
        let p = this.head
        while (p) {
            ret.push(p.element)
            p = p.next
        }
        return ret
    }

    static from(data) {
        const list = new this()
        data.forEach(value => list.append(value))
        return list
    }

    // 翻转指定区间
    reverse(from, to) {
        if(!this.head || from >= to || from >= this.count || from < 0 || to >= this.count || to < 0) return
        let dummy = new LinkedListNode(0)
        dummy.next = this.head
        let p = dummy
        for (let i = 0; i < from; i++)
            p = p.next
        //p此时就是from的前驱节点
        let pFrom = p.next
        for (let i = from; i < to; i++) {
            const n = pFrom.next
            pFrom.next = n.next
            n.next = p.next
            p.next = n
        }
        this.head = dummy.next
        return dummy.next
    }

    // 按指定的长度对链表分段翻转
    reverseByGroup(k) {
        if (k <= 1 || !this.head) return this.head
        const internalReverse = (prev, end) => {
            let p = prev.next
            while (p.next !== end) {
                const n = p.next
                p.next = n.next
                n.next = prev.next
                prev.next = n
            }
            // 返回最后一个节点，作为下一组的前驱节点
            return p
        }
        let dummy = new LinkedListNode(0)
        dummy.next = this.head
        let p = dummy,
            prev = dummy
        while (p) {
            prev = p
            for (let i = 0; i < k; i++) {
                p = p.next
                if(!p) {// 不够K个，无法翻转
                    this.head = dummy.next
                    return dummy.next
                }
            }
            p = internalReverse(prev, p.next)
        }
        this.head = dummy.next
        return this.head
    }

    // 判断链表是否有环，并返回重合开始的节点
    hasCircle() {
        if (!this.head || !this.head.next)
            return null
        let fast = this.head, // 两个指针，一个一次走两步，一个一次走一步
            slow = this.head
        while (fast.next && fast.next.next) {
            fast = fast.next.next
            slow = slow.next
            if (slow === fast) {// 重合的时候，fast的移动距离是slow的两倍
                slow = this.head
                while (slow !== fast) {
                    fast = fast.next
                    slow = slow.next
                }
                return slow
            }
        }
        return null
    }

    intersect(another) {
        return LinkedList.intersect(this, another)
    }

    sort() {
        if (this.count >= 100)
            this.head = LinkedList.insertionSort(this.head)
        else
            this.head = LinkedList.mergeSort(this.head)
    }

    // 并归排序
    static mergeSort(head) {
        if (!head || !head.next) return head
        const merge = (l1,l2) => {
            if (!l1 && !l2) return null
            if(!l1 && l2) return l2
            if(!l2 && l1) return l1
            let dummy = new LinkedListNode(0),
                p = dummy
            while (l1 && l2) {
                if (l1.element < l2.element) {
                    p.next = l1
                    l1 = l1.next
                } else {
                    p.next = l2
                    l2 = l2.next
                }
                p = p.next
            }
            if (l1)
                p.next = l1
            else
                p.next = l2
            return dummy.next
        }
        let fast = head,
            slow = head
        // 快慢指针得到中间节点
        while (fast.next && fast.next.next) {
            fast = fast.next.next
            slow = slow.next
        }
        // 将链表拆成两部分
        fast = slow.next
        slow.next = null
        // 左右两边分别排列
        const p1 = this.mergeSort(head),
            p2 = this.mergeSort(fast)
        // 合并
        return merge(p1, p2)
    }

    // 插入排序
    static insertionSort(head) {
        if (!head || !head.next) return head
        let dummy = new LinkedListNode(0),
            p = dummy,
            cur = head
        while (cur) {
            p = dummy
            while (p.next && p.next.element <= cur.element) {
                p = p.next
            }
            const n = p.next
            p.next = cur
            cur = cur.next
            p.next.next = n
        }
        return dummy.next
    }

    // 成对交换
    swapInPairs() {
        if (!this.head || !this.head.next) return this.head
        let dummy = new LinkedListNode(0),
            p = dummy
        dummy.next = this.head
        while (p && p.next && p.next.next) {
            const n = p.next,
                nn = p.next.next
            p.next = nn
            n.next = nn.next
            nn.next = n
            p = p.next.next
        }
        this.head = dummy.next
        return this.head
    }

    reorder() {
        if(!this.head || !this.head.next) return
        let fast = this.head,
            slow = this.head
        // 快慢指针切分链表
        while (fast.next && fast.next.next) {
            fast = fast.next.next
            slow = slow.next
        }
        fast = slow.next
        slow.next = null

        // 翻转右半部分
        let dummy = new LinkedListNode(0)
        while (fast) {
            const n = dummy.next
            dummy.next = fast
            const nn = fast.next
            fast.next = n
            fast = nn
        }
        slow = this.head
        fast = dummy.next
        // 依次合并
        while (slow) {
            if (fast) {
                const n = slow.next
                slow.next = fast
                const nn = fast.next
                fast.next = n
                fast = nn
                slow = n
            } else
                break
        }
    }

    partition(x) {
        const dummy1 = new LinkedListNode(0),
            dummy2 = new LinkedListNode(0)
        let p1 = dummy1,
            p2 = dummy2,
            p = this.head

        while (p) {
            if (p.element < x) {
                p1.next = p
                p1 = p1.next
            } else {
                p2.next = p
                p2 = p2.next
            }
            p = p.next
        }

        p2.next = null
        p1.next = dummy2.next
        this.head = dummy1.next
        return this.head
    }

    static intersect(listA, listB) {
        let headA = listA.head,
            headB = listB.head
        if (!headA || !headB)
            return null
        let p = headA.next
        while (p.next) {
            p = p.next
        }
        // 将两个链表连接起来
        p.next = headB
        let tail = p
        p = headA
        // fast 和 slow，判断是否有环
        headB = headA
        while (headB.next && headB.next.next) {
            headA = headA.next
            headB = headB.next.next
            if (headA === headB)
                break
        }
        if (!headA.next || !headB.next || !headB.next.next) {
            tail.next = null
            return null
        }
        // 有环，得到环的起点
        headA = p
        while (headA !== headB) {
            headA = headA.next
            headB = headB.next
        }
        // 断开两个链表
        tail.next = null
        return headA
    }
}

module.exports = {
    LinkedList,
    LinkedListNode
}
