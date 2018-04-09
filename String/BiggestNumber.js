// 输入一串只有数字和字母的字符串，输出该字符串中最大的数字
module.exports = str => {
    const reg = /\d/g
    const arr = str.match(reg)
    return Math.max(...arr)
}
