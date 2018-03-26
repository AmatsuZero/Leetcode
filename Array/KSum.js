const twoSum = (numbers, begin, first, second, target, ret) => {
    if (begin >= numbers.length - 1) return
    let b = begin
    let e = numbers.length - 1
    while (b < e) {
        const rest = numbers[b] + numbers[e]
        if (rest === target) {
            let tmpRet = []
            tmpRet.push(first)
            tmpRet.push(second)
            tmpRet.push(numbers[b])
            tmpRet.push(numbers[e])
            ret.push(tmpRet)
            do {
                b++
            } while (b < e && numbers[b] === numbers[b-1])
            do {
                e--
            } while (b < e && numbers[e] === numbers[e+1])
        } else if (rest < target) b++
        else e--
    }
}

module.exports = (num, target) => {
    let ret = []
    if (num.length <= 3) return ret
    const length = num.sort().length
    for (let i = 0; i < length - 3; i++) {
        if (i > 0 && num[i] === num[i-1]) continue
        for (let j = i + 1; j < length - 2; j++) {
            if (j > 1 + 1 && num[j] === num[j-1]) continue
            twoSum(num, j+1, num[i], num[j], target-(num[i]+num[j]), ret)
        }
    }
    return ret
}