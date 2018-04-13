/*
* “Determine whether an integer is a palindrome. Do this without extra space”
* */

module.exports = (num) => {
    let x = num
    if (x < 0)
        return false
    else if (x === 0)
        return true
    else {
        const tmp = x
        let y = 0
        while (x !== 0) {
            y = y * 10 + Math.floor(x % 10)
            x = Math.floor(x / 10)
        }
        return y === tmp;
    }
}
