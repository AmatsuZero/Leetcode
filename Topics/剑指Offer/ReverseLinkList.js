const reverse = head => {
    if (head) {
        if (head.next)
            reverse(head.next)
        console.log("Value: " + head.element)
    }
}

module.exports = head => reverse(head)
