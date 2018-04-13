/*
输入为n个数，输出为n个数的全排列所产生的不同的数，并且要求升序。
输入：第一行为n，接下来为n行要排列组合的数。
3
1
5
9
输出
159
195
519
591
915
951

思考：
我们要得到全排列，只要像冒泡一样交换各个位就行，不过要注意取模达到重复效果。循环次数为全排列种类数。举例如下
159，交换1和2，得519
519，交换2和3，得591
591，交换1和2，得951
951，交换2和3，得915
915，交换1和2，得195
195，交换2和3，得159
* */
const swap = (array, index1, index2) => {
    const temp = array[index1]
    array[index1] = array[index2]
    array[index2] = temp
}

const permutation = (array, start, result) => {
    if (start === array.length-1) //如果已经到了数组的最后一个元素，前面的元素已经排好，输出。
        result.push(array.join(""))
    for (let i = start; i < array.length; i++) {
        if (i === start || array[i] !== array[start]) {
            //把第一个元素分别与后面的元素进行交换，递归的调用其子数组进行排序
            swap(array, i, start)
            permutation(array, start+1, result)
            swap(array, i, start)
        }
    }
}

module.exports = input => {
    const result = []
    permutation(input, 0, result)
    return result.join(",")
}
