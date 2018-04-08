const getLocation = (pattern, text, pos) => {
    // 判断在text中的length位置的字符是否在pattern中存在，如果存在，则返回；否则返回-1
    let i = pattern.length - 1
    while (i >= 0 && pattern.charAt(i) !== text.charAt(pos))
        i--
    return i
}

module.exports = (original, pattern) => {
     let i = 0,
         j = 0,
         flag = false,
         dCount = 0, // 记录从左向右匹配的字符数
         location = 0
    while (i < original.length && !flag) {
         j = 0
        dCount = 0
        flag = false
        while (!flag && j < pattern.length && i < original.length && original.charAt(i) === pattern.charAt(j)) {
             dCount ++
            if (dCount === pattern.length) {
                flag = true
                break
            }
            i++
            j++
        }
        if (j < pattern.length && i < original.length && original.charAt(i) !== pattern.charAt(j)) {
             location = getLocation(pattern, original, pattern.length+i-dCount)
             if (location !== -1)
                 i += pattern.length - dCount - location
             else
                 i += pattern.length + 1 - dCount
        }
    }
    return i - pattern.length+1
}
