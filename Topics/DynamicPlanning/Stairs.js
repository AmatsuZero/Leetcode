/*
* ## 题目描述

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

* */

module.exports = n => {
    if (n <= 1)
        return n
    let pre2 = 0,
        pre1 = 1,
        result = 0
    for (let i = 1; i <= n; i++) {
        result = pre2 + pre1
        pre2 = pre1
        pre1 = result
    }
    return result
}
