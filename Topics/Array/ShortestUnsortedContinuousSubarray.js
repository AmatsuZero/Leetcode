/*
* Given an integer array, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order, too.

You need to find the shortest such subarray and output its length.

Example 1:
Input: [2, 6, 4, 8, 10, 9, 15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
Note:
Then length of the input array is in range [1, 10,000].
The input array may contain duplicates, so ascending order here means <=.
* */

module.exports = array => {
    let start = -1,
        end  = -1,
        max = array[0], // 当前元素左边范围内的最大值，从前面往后查找其实元素
        min = array[array.length-1] // 从后面向前查找终止元素
    // 从左向右遍历，如果array[i]小于左边所有元素最大值，则其可能是右边界
    for (let i = 1; i < array.length - 1; i++) {
        max = Math.max(max, array[i])
        if (array[i] < max)
            end = i
    }
    // 从右向左遍历，如果array[i]大于右边所有元素最大值，则其有可能是左边界
    for (let j = array.length - 2; j >= 0; j--) {
        min = Math.min(min, array[j])
        if (array[j] >= min)
            start = j
    }
    return end === 0 ? 0 : end - start + 1
}
