// Input: (1,2,3,(4,5),6,(7,8,9))
// Output: (1,2,3,4,5,6,7,8,9)
const Queue = require("../../DataStructure/Queue")

const simple = string => {
    const reg = /\d/g
    const result = string.match(reg)
    return `(${result.join(",")})`
}

module.exports = (string, useReg = true) => {
    if (useReg) return simple(string)
    const length = string.length,
        result = [],
        queue = new Queue();
    for (let i = 1; i < length; i++) {
        const char = string.charAt(i)
        switch (char) {
            case ")":
                while (!queue.isEmpty) {
                    result.push(queue.dequeue())
                }
                break
            case ",":
            case "(":
            case " ":
                break
            default:
               queue.enqueue(char)
        }
    }
    return `(${result.join(",")})`
}
