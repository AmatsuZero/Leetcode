const { assert }= require('chai')
const {describe, it} = require('mocha')
const { LinkedList }  = require("../DataStructure/LinkedList")
const SortedLinkedList = require("../DataStructure/SortedLinkedList")
const addTwoNums = require("../DataStructure/AddTwoNumbers")

describe("链表相关", () => {
    it("判断两个链表是否相交", () => {
        let list = LinkedList.from([1,2,3,4,5,6,7])
        const node = list.nodeAt(3)
        const another = LinkedList.from([6,7,8,9])
        const tail = another.nodeAt(3)
        tail.next = node
        assert.strictEqual(list.intersect(another), node)
    })
    it("排序链表去掉重复元素", () => {
        const list = SortedLinkedList.from([1,3,5,2,2,2,2,8])
        list.deleteDuplicates()
        const arr = []
        for (let i = 0; i < list.count; i++) {
            arr.push(list.valueAt(i))
        }
        assert.sameDeepOrderedMembers(arr, [1,2,3,5,8])
        const duplicates = SortedLinkedList.from([1,3,5,2,2,2,2,8])
        duplicates.deleteAllDuplicate()
        assert.strictEqual(duplicates.count, 4)
    })
    it("合并有序链表", () => {
        const l1 = SortedLinkedList.from([1,8,5])
        const l2 = SortedLinkedList.from([3,2,0,4,6])
        const l3 = SortedLinkedList.from([9,7,10])
        l1.merge(l2, l3)
        const arr = []
        for (let i = 0; i < l1.count; i++) {
            arr.push(l1.valueAt(i))
        }
        assert.sameDeepOrderedMembers(arr, [0,1,2,3,4,5,6,7,8,9,10])
    })
    it("翻转链表指定区间", () => {
        const list = LinkedList.from([1,2,3,4])
        list.reverse(1,2)
        assert.sameDeepOrderedMembers(list.toArray(), [1,3,2,4])
    })
    it("Reverse By group", () => {
        const list = LinkedList.from([1,2,3,4,5])
        list.reverseByGroup(3)
        assert.sameDeepOrderedMembers(list.toArray(), [3,2,1,4,5])
    })
    it("成对交换", () => {
        const list = LinkedList.from([1,2,3,4])
        list.swapInPairs()
        assert.sameDeepOrderedMembers(list.toArray(), [2,1,4,3])
    })
    it("排序", () => {
        const list = LinkedList.from([5,3,2,4,1])
        assert.sameDeepOrderedMembers(list.toArray(), [1,2,3,4,5])
    })
    it("旋转", () => {
        const list = LinkedList.from([1,2,3,4,5])
        list.rotateRight(2)
        assert.sameDeepOrderedMembers(list.toArray(), [4,5,1,2,3])
    })
    it("重新排序", () => {
        const list = LinkedList.from([1,2,3,4])
        list.reorder()
        assert.sameDeepOrderedMembers(list.toArray(), [1,4,2,3])
    })
    it("分割", () => {
        const list = LinkedList.from([1,4,3,2,5,2])
        list.partition(3)
        assert.sameDeepOrderedMembers(list.toArray(), [1,2,2,4,3,5])
    })
    it("两数相加", () => {
        const l1 = LinkedList.from([2,4,6])
        const l2 = LinkedList.from([5,6,4])
        const list = addTwoNums(l1.head, l2.head)
        assert.sameDeepOrderedMembers(list.toArray(), [7,0,1,1])
    })
})
