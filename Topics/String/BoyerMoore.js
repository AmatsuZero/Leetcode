// 利用坏字符规则计算移动位数
// 后移位数 = 坏字符的位置 - 模式串的坏字符上一次出现的位置
const baCharacter = (pattern, barChar, badCharSuffix) => badCharSuffix - pattern.lastIndexOf(barChar, badCharSuffix)
// 利用好后缀规则计算移动位数
// 后移位数 = 好后缀的位置 - 模式串上一次出现的位置
const goodCharacter = (pattern, goodCharSuffix) => {
    let result = -1
    // 模式串长度
    const moduleLength = pattern.length
    // 好字符数
    let goodCharNum = moduleLength - 1 - goodCharSuffix
    while (goodCharNum > 0) {
        const endSection = pattern.substr(moduleLength - goodCharNum, moduleLength)
        const startSection = pattern.substr(0, goodCharNum)
        if (startSection === endSection)
            result = moduleLength - goodCharNum
        goodCharNum--
    }
    return result
}

module.exports = (originString, pattern) => {
    // 主串
    if (!originString || originString.length <= 0) return -1
    // 模式串
    if (!pattern || pattern.length <= 0) return -1
    // 如果模式串的长度大于主串长度，那么一定不匹配
    if (originString.length < pattern.length) return -1
    let moduleSuffix = pattern.length - 1,
        moduleIndex = moduleSuffix,
        originIndex= moduleSuffix,
        ot = originIndex
    while (originIndex < originString.length && moduleIndex >= 0) {
        const oc = originString.charAt(originIndex),
            mc = pattern.charAt(moduleIndex)
        if (oc === mc) {
            originIndex--
            moduleIndex--
        } else {
            // 坏字符规则
            const badMove = baCharacter(pattern, oc, moduleIndex)
            // 好字符规则
            const goodMove = goodCharacter(pattern, moduleIndex)
            // 主串不动，模式串右移
            originIndex = ot + Math.max(badMove, goodMove)
            moduleIndex = moduleSuffix
            // ot是中间变量
            ot = originIndex
        }
    }
    if (moduleIndex < 0) //多移动了一次
        return originIndex + 1
    return -1
}
