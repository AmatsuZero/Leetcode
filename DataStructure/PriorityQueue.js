const Queue = require('./Queue')

class QueueElement {
    constructor(data, priority) {
        this.element = data
        this.priority = priority
    }
}

class PriorityQueue extends Queue {

    constructor(data) {
        const items = data.map((value, index) => new QueueElement(value, data.length-index))
        super(items)
    }

    enqueue(element, priority) {
        const newElement = new QueueElement(element, priority)
        if (this.isEmpty)
            this.items.push(newElement)
        else {
            let added = false
            for (let i = 0; i < this.size; i++) {
                if (priority > this.items[i].priority) {
                    this.items.splice(i, 0, newElement)
                    added = true
                    break
                }
            }
            if (!added)
                super.enqueue(newElement)
        }
    }
}

module.exports = PriorityQueue
