/*
* 十进制转二进制
* */

const Stack = require('../DataStructure/Stack')

module.exports = (num) => {
    const type = typeof num
    let value
    switch (type) {
        case 'string':
            if (isNaN(num)) throw Error('不合法的数字')
            value = parseInt(num)
            break
        case 'number':
            value = num
            break
        default:
            throw Error('不合法的数字')
    }
    const stack = new Stack()
    let rem = 0, binaryString = ''
    while (value > 0) {
        rem = Math.floor(value % 2)
        stack.push(rem)
        value = Math.floor(value / 2)
    }
    while (!stack.isEmpty)
        binaryString += stack.pop().toString()
    return binaryString
}
