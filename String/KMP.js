// next[j]表示在当前模式串到T[j]遇到失败的情况，在模式串和主串匹配的位置
const  getNext = str => {
    // 对Str求出各个字符位置的部分匹配值
    const next = new Array(str.length+1).fill(0)
    let j = 0
    for (let i = 1; i < str.length; i++) {
        while (j > 0 && str.charAt(j) !== str.charAt(i))
            j = next[j]
        if (str.charAt(i) === str.charAt(j))
            j++
        next[j+1] = j
    }
    return next
}

module.exports = (original, pattern) => {
    let j = 0
    let ret = -1
    const next = getNext(pattern)
    for (let i = 0; i < original.length; i++) {
        while (j > 0 && original.charAt(i) !== pattern.charAt(j))
            j = next[j]
        if (original.charAt(i) === pattern.charAt(j))
            j++
        if (j === pattern.length) {
            ret = i - j + 1
            j = next[j]
        }
    }
    return ret
}
