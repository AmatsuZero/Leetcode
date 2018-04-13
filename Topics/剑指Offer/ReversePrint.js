/*
* 输入链表的第一个节点，从尾到头反过来打印出每个结点的值。
* */


module.exports = head => {
    const stack = []
    while (head.element) {
        stack.push(head.element)
    }
    const result = []
    while (stack.length > 0) {
        result.push(stack.pop())
    }
    return result
}
