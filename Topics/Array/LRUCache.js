/*
* Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

Follow up:
Could you do both operations in O(1) time complexity?

Example:
LRUCache cache = new LRUCache( 2 );// capacity

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4

*/

class Node {
    constructor(k, v) {
        this.key = k
        this.value = v
        this.next = null
        this._prevKey = {prev: "prev"}
        this._weakMap = new WeakMap()
    }

    get prev() {
        this._weakMap.get(this._prevKey)
    }

    set prev(val) {
        this._weakMap.set(this._prevKey, val)
    }
}

class DoubleLinkedList {
    constructor() {
        this._pHead = null
        this._size = 0
        this._weakMap = new WeakMap()
        this._pTailKey = {tail: "tail"}
    }

    get _pTail() {
        return this._weakMap.get(this._pTailKey)
    }

    set _pTail(val) {
        this._weakMap.set(this._pTailKey, val)
    }

    size() {
        return this._size
    }

    push(key, value) {
        const n = new Node(key, value)
        this._size++
        if (this._pHead === null) {
            this._pHead = this._pTail = n
            return
        }
        this._pTail.next = n
        n.prev = this._pTail
        n.next = null
        this._pTail = n
        return n
    }

    takeToFirst(n) {
        this.remove(n)
        this.unshift(n)
    }

    unshift(key, value) {
        const n = new Node(key, value)
        this._size++
        if (this._pHead === null) {
            this._pHead = this._pTail = n
            return n
        }
        n.next = this._pHead
        n.prev = null
        this._pHead.prev = n
        this._pHead = n
        return n
    }

    remove(n) {
        const before = n.prev
        const after = n.next
        if (before !== null)
            before.next = after

        if (after !== null)
            after.prev = before

        if (this._pHead === n)
            this._pHead = this._pHead.next
        else if (this._pTail === n)
            this._pTail = this._pTail.prev

        this._size--
    }

    pop() {
        const value = this._pTail.value
        this.remove(this._pTail)
        return value
    }

    last() {
        return this._pTail
    }

    destroy() {
        while (this._pHead !== null) {
            const p = this._pHead
            this._pHead = p.next
        }
    }

    toString() {
    	let desc = ""
	    let p = this._pHead
	    while (p !== null) {
		    desc += `(${p.key}, ${p.value}\n)`
		    p = p.next
	    }
	    return desc
    }
}

class LRUCache {
    constructor(capacity) {
        //the max capacity of cache
        this._capacity = capacity
        //cacheMap - index the date for searching
        this._cacheMap = new Map()
        //cacheList - store the date
        this._cacheList = new DoubleLinkedList()
    }

    set(key, value) {
        // key found, update the data, and take to the front
        if (this._cacheMap.has(key)) {
            const p = this._cacheMap.get(key)
            p.value = value
            this._cacheList.takeToFirst(this._cacheMap.get(key))
        } else {
            // key not found, new a node to store data
            this._cacheMap.set(key, this._cacheList.unshift(key, value))
            // if the capacity exceed, remove the last one.
            if (this._cacheList.size() > this._capacity) {
                const oldKey = this._cacheList.last().key
                this._cacheMap.delete(oldKey)
                this._cacheList.pop()
            }
        }
    }

    get(key) {
        // The accessed node must be up-to-time -- take to the front
        if (this._cacheMap.has(key)) {
            this._cacheList.takeToFirst(this._cacheMap.get(key))
            return this._cacheMap.get(key).value
        }
        return -1
    }

    toString() {
    	return this._cacheList.toString()
    }
}

module.exports = LRUCache
