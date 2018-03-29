class Queue {

    constructor(data = []) {
        this.items = data
    }

    enqueue(element) {
        this.items.push(element)
    }

    dequeue() {
        return this.items.shift()
    }

    get front() {
        return this.items[0]
    }

    clear() {
        this.items = []
    }

    get size() {
       return this.items.length
    }

    get isEmpty() {
        return this.items.length === 0
    }


}

module.exports = Queue
