/*
* 链接：https://www.nowcoder.com/questionTerminal/661c49118ca241909add3a11c96408c8?orderByHotValue=1&mutiTagIds=593&page=1&onlyReference=false
来源：牛客网

有 n 个学生站成一排，每个学生有一个能力值，牛牛想从这 n 个学生中按照顺序选取 k 名学生，要求相邻两个学生的位置编号的差不超过 d，使得这 k 个学生的能力值的乘积最大，你能返回最大的乘积吗？
输入描述:
每个输入包含 1 个测试用例。每个测试数据的第一行包含一个整数 n (1 <= n <= 50)，表示学生的个数，
接下来的一行，包含 n 个整数，按顺序表示每个学生的能力值 ai（-50 <= ai <= 50）。
接下来的一行包含两个整数，k 和 d (1 <= k <= 10, 1 <= d <= 50)。

输出描述:
输出一行表示最大的乘积。

示例1

输入

3
7 4 7
2 50

输出

49
* */


const readLine = require('readline')

const MaxProduct = (stu, K, D) => {
    let ans = -Infinity
    const n = stu.length
    stu.unshift(ans)
    const fm = []
    for (let i = 0; i <= K; i++) {
        fm.push(new Array(n+1).fill(0))
    }
    const fn = Array.from(fm)
    for (let i = 1; i <= n; i++) {
        fm[1][i] = fn[1][i] = stu[i]
        for (let k = 2; k <= K; k++) {
            for (let j = i - 1; j > 0 && i - j <= D; j--) {
                fm[k][i] = Math.max(fm[k][i], Math.max(fm[k-1][j] * stu[i], fn[k-1][j] * stu[i]))
                fn[k][i] = Math.min(fn[k][i], Math.min(fn[k-1][j] * stu[i], fm[k-1][j] * stu[i]))
            }
        }
        ans = Math.max(ans, fm[K][i])
    }
    return ans
}

const Interactive = () => {
    let stu
    let k
    let d
    let ret = 0
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '输入值不合法！'
    })
    rl.on('close', () => {
        console.log('最大乘积是：%d', ret)
    })
    rl.question('输入学生的个数 (1 <= n <= 50): ', (n) => {
        if (isNaN(n) ||  n < 1 || n > 50) {
            rl.prompt()
            rl.close()
            return
        }
        stu = new Array(parseInt(n))
        rl.question('按顺序输入每个学生的能力值（-50 <= ai <= 50），按空格分割: ', (input) => {
            let values = input.trim().split(' ').map((value) => parseInt(value))
            if (values.length !== stu.length || values.includes(NaN)) {
                rl.prompt()
                rl.close()
            } else if (values.some(value => value < -50 || value > 50)) {
                rl.prompt()
                rl.close()
            } else {
                values.forEach((value, i) => stu[i] = value)
                rl.question('选取多少名学生 (1 <= k <= 10)：', (value) => {
                    k = parseInt(value)
                    if (isNaN(k) || k < 1 || k > 10) {
                        rl.prompt()
                        rl.close()
                        return
                    }
                    rl.question('两个学生的位置编号的差不超过: ', (value) => {
                        d = parseInt(value)
                        if (isNaN(d) || d < 1 || d > 50) {
                            rl.prompt()
                            rl.close()
                            return
                        }
                        ret = MaxProduct(stu, k ,d)
                    })
                })
            }
        })
    })
}

module.exports = {
    MaxProduct,
    Interactive
}
