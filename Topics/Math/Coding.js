const mod = (o, m) => {
    if (m === 0)
        throw TypeError("模的取值范围：除零外的数字(整数、小数、正数和负数")
    return o - m * Math.floor(o/m)
}

const rem = (dividend, divisor) => {
    if (divisor === 0)
        throw  TypeError("被除数的取值范围：除零外的数字(整数、小数、正数和负数)")
    return dividend - divisor * Math.trunc(dividend/divisor)
}

module.exports = {
    mod,
    rem
}
