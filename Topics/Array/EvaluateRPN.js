/*
* Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, /. Each operand may be an integer or another expression.

Some examples:
[“2”, “1”, “+”, “3”, ““] -> ((2 + 1) 3) -> 9
[“4”, “13”, “5”, “/”, “+”] -> (4 + (13 / 5)) -> 6
* */

const Stack = require("../DataStructure/Stack")

module.exports = rpn => {
    const stack = new Stack()
    const set = new Set(["+","-","*","/"])
    rpn.forEach(token => {
        if (set.has(token)) {
            const num2 = parseInt(stack.pop())
            const num1 = parseInt(stack.pop())
            switch (token) {
                case "+":
                    stack.push(num1 + num2)
                    break
                case "-":
                    stack.push(num1 - num2)
                    break
                case "*":
                    stack.push(num1 * num2)
                    break
                case "/":
                    stack.push(Math.trunc(num1 / num2))
                    break
            }
        } else {
            stack.push(parseInt(token))
        }
    })
    return stack.peek()
}
