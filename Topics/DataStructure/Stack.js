class Stack {

    constructor(data = []) {
        this.items = data
    }

    push(element) {
        this.items.push(element)
    }

    pop() {
        return this.items.pop()
    }

    peek() {
        return this.items[this.items.length-1]
    }

    get isEmpty() {
        return this.items.length === 0
    }

    get size() {
        return this.items.length
    }

    clear() {
        this.items = []
    }
}

module.exports = Stack
