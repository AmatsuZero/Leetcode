/*
* Implement a basic calculator to evaluate a simple expression string.
* The expression string contains only non-negative integers, +, -, *, / operators and empty spaces   .
* The integer division should truncate toward zero. You may assume that the given expression is always valid. Some examples:
*
* 3+2*2 = 7
" 3/2  = 1
" 3+5 / 2 " = 5
* */

module.exports = express => {
    let result = 0,
        interRes = 0,
        op = "+",
        ch = 0
    const zeroCharCode = "0".charCodeAt(0),
        nineCharCode = "9".charCodeAt(0)
    const chars = express.replace(/\r|\n|\s/gi, "").split("")
    for (let i = 0; i < chars.length; i++) {
        ch = chars[i].charCodeAt(0)
        if (ch >= zeroCharCode && ch <= nineCharCode) {
            let num = ch - "0".charCodeAt(0)
            while (++i < chars.length && chars[i].charCodeAt(0) >= zeroCharCode && chars[i].charCodeAt(0) <= nineCharCode)
                num = num*10 + chars[i].charCodeAt(0) - zeroCharCode
            switch (op) {
                case "+":
                    interRes += num
                    break
                case "-":
                    interRes -= num
                    break
                case "*":
                    interRes *= num
                    break
                case "/":
                    interRes = Math.floor(interRes/num)
                    break
            }
        } else {
            if (String.fromCharCode(ch) === "+" || String.fromCharCode(ch) === "-") {
                result += interRes
                interRes = 0
            }
            op = chars[i++]
        }
    }
    return `${result+interRes}`
}
