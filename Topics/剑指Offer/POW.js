const Power = (base, exponent) => {
    if (exponent === 0)
        return 1
    if (exponent === 1)
        return base
    if (base === 1)
        return 1
    let isNegative = false
    if (exponent < 0) {
        exponent = -exponent
        isNegative = true
    }
    let pow = Power(base * base, Math.trunc(exponent / 2));
    if (exponent % 2 !== 0)
        pow = pow * base
    return isNegative ? (1 / pow) : pow
}

module.exports = (base, exponent) => Power(base, exponent)
