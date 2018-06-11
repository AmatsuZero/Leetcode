/*
给定整数n和m，将1到n的这n个整数按字典序排列之后，求其中的第m个数字。
举例：对于n = 11，m = 4，按字典序排列依次为1, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9，因此第4个数字为2。
* */
module.exports = (n, m) => {
    if (m <= 0 || n < 1 || m  > n ) {
        console.warn("不合法的输入")
        return
    }
    const dictionary = []
    for (let i = 1; i <= n; i++)
        dictionary.push(String(i).split(""))
    dictionary.sort((num1, num2) => {
        const charA = num1[0].charCodeAt(0),
            charB = num2[0].charCodeAt(0)
        if (charA > charB)
            return 1
        else if (charA < charB)
            return -1
        else
            return 0
    })
    return parseInt(dictionary[m-1].join(""))
}
