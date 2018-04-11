// 逆波兰表达式

// 运算优先度
const precedence = {
    "√": 3,
    "%": 3,
    "!": 3,
    "^": 3,
    "/": 2,
    "*": 2,
    "-": 1,
    "+": 1,
    "#": 0
}

// 运算操作
const operation = {
    "+": (a, b) => (+a) + (+b),
    "-": (a, b) => (+a) + (+b),
    "*": (a, b) => (+a) * (+b),
    "/": (a, b) => (+a) / (+b),
    "^": (x, n) => Math.pow(+x, +n),
    "!": (n) => {
        let r = 1
        for (let i = 1; i <= +n; i++)
            r *= i
        return +n < 0 ? NaN: r
    },
    "%": n => +n / 100,
    "√": n => Math.sqrt(+n)
}

const isOperator = char => /^[√%!^\/*-+#]$/.test(char)
const isUnaryOperator = char => /^[√%!]$/.test(char)
const isBrackets = char => /^[()]$/.test(char)
const isNumber = char => /^-?\d+\.\d+$|^-?\d+$/.test(char)
const splitExp = express => {
    express = express.replace(/[a-zA-Z]/g, '').replace(/([\d%!])-(\d√)/g, '$1 - $2').replace(/([+\-*\/^])-(\d)/g, '$1 -$2')
    return (/^[+*\/!^%]|\d\(|[\d)]√|%[\d(]|![\d(]|%%|[+\-*\/^]{2,}|[+\-*\/√^]$/.test(express))
        ? null
        : express.match(/(-?(?:\d+\.?\d*|-?\.\d*))|[()+\-*\/√!^%]/gi)
}

const infix2RPN = exp => {
    let arrExp = splitExp(exp),
        expStack = [],
        opStack = []
    if (!arrExp)
        return null
    arrExp = arrExp.concat("#")
    arrExp.forEach(opItem => {
        if (isNumber(opItem))
            expStack.push(opItem)
        else if (isOperator(opItem)) {
            while (opStack.length > 0) {
                const stackItem = opStack.pop()
                if ((opItem === '√' && stackItem === '√' && precedence[stackItem] > precedence[opItem]) ||
                    ((opItem !== '√' || stackItem !== '√') && precedence[stackItem] >= precedence[opItem]))
                    expStack.push(stackItem)
                else {
                    opStack.push(stackItem)
                    break
                }
            }
            opStack.push(opItem)
        } else if (isBrackets(opItem)) {
            if (opItem === '(') {
                opStack.push(opItem)
            } else {
                while (opStack.length > 0) {
                    const stackItem = opStack.pop()
                    if (stackItem !== '(')
                        expStack.push(stackItem)
                    else
                        break
                }
            }
        }
    })
    return expStack
}

const RPNCalculate = expStack => {
    const calStack = []
    expStack.forEach(opItem => {
        if (isNumber(opItem))
            calStack.push(opItem)
        else if (isOperator(opItem)) {
            if (isUnaryOperator(opItem)) {
                calStack.push(operation[opItem](calStack.pop()))
            } else {
                const param1 = calStack.pop(),
                    param2 = calStack.pop()
                calStack.push(operation[opItem](param1, param2))
            }
        }
    })
    return +calStack.pop().toFixed(3)
}

module.exports = express => RPNCalculate(infix2RPN(express))
