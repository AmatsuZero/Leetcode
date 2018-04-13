/*
* ## 题目描述

请实现一个函数，将一个字符串中的空格替换成“%20”。例如，当字符串为 We Are Happy. 则经过替换之后的字符串为 We%20Are%20Happy。
* */

const setCharAt = (str, index, chr) => {
    if (index > str.length-1) return str
    return str.substr(0,index) + chr + str.substr(index+1)
}

module.exports = string => {
    const oldLen = string.length
    for (let i = 0; i < oldLen; i++)
        if (string.charAt(i) === " ")
            string += "###" //三个字符
    let idxOfOld = oldLen - 1,
        idxOfNew = string.length - 1
    while (idxOfOld >= 0 && idxOfNew > idxOfOld) {
        const char = string.charAt(idxOfOld)
        string = setCharAt(string, idxOfOld--, " ") // 把原来位置的字符替换成空格
        if (char === " ") {
            string = setCharAt(string, idxOfNew--, '0')
            string = setCharAt(string, idxOfNew--, '2')
            string = setCharAt(string, idxOfNew--, '%')
        } else
            string = setCharAt(string, idxOfNew--, char);
    }
    return string.trimLeft()
}
