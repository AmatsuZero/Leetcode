/*
* https://mp.weixin.qq.com/s/Tq-hUeNv-wrF-hjKoA4nfw
* */

module.exports = input => {
  const array = [...input]
  //1.得到数列的最大值和最小值，并算出差值d
  let max = array[0],
      min = array[0]
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
    }
    if (array[i] < min) {
      min = array[i]
    }
  }

  const delta = max - min
  //2.创建统计数组并统计对应元素个数
  const countArray = new Array(delta+1).fill(0)
  array.forEach(((value) => countArray[value - min]++))
  //3.统计数组做变形，后面的元素等于前面的元素之和
  let sum = 0
  countArray.forEach(((value, index) => {
    sum += value
    countArray[index] = sum
  }))
  //4.倒序遍历原始数列，从统计数组找到正确位置，输出到结果数组
  const sortedArray = new Array(array.length)
  for (let i = array.length - 1; i >= 0; i--) {
    sortedArray[countArray[array[i]-min]-1] = array[i]
    countArray[array[i]-min]--
  }
  return sortedArray
}
