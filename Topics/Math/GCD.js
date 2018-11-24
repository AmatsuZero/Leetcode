// 最大公约数

module.exports = (m, n) => {
    const small = Math.min(m, n) // 找到两数之间的较小数
    for (let i = small; i > 0; i--) {// 按照从大到小的顺序寻找满足条件的自然数
        if (m % i === 0 && n % i === 0)
            return i
    }
    return -1
}