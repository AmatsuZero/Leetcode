/*
* 约瑟夫环问题
*
* 链接：https://www.nowcoder.com/questionTerminal/11b018d042444d4d9ca4914c7b84a968
来源：牛客网

约瑟夫问题是一个非常著名的趣题，即由n个人坐成一圈，按顺时针由1开始给他们编号。然后由第一个人开始报数，数到m的人出局。现在需要求的是最后一个出局的人的编号。

给定两个int n和m，代表游戏的人数。请返回最后一个出局的人的编号。保证n和m小于等于1000。

测试样例：

5 3

返回：4
* */

module.exports = (n, m) => {
    if (n <= 0 || m <= 0) return -1
    let s = 0
    for (let i = 2; i <= n; i++)
        s = Math.trunc((s+m)%i)
    return s+1
}
