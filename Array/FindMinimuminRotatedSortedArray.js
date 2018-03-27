/*
* Suppose a sorted array is rotated at some pivot unknown to you beforehand.
(i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).
Find the minimum element.
You may assume no duplicate exists in the array.
* */

module.exports = (numbers) => {
    const length = numbers.length
    if (length === 0) return 0
    if (length === 1) return numbers[0]
    if (length === 2) return Math.min(numbers[0], numbers[1])
    let start = 0
    let stop = length - 1
    while (start < stop - 1) {
        if (numbers[start] < numbers[stop]) return numbers[start]
        const mid = Math.floor((stop + start) / 2)
        if (numbers[mid] > numbers[start]) //A[mid] > A[start]，那么最小值一定在右半区间，譬如[4,5,6,7,0,1,2]，中间元素为7，7 > 4，最小元素一定在[7,0,1,2]这边，于是我们继续在这个区间查找。
            start = mid
        else if (numbers[mid] < numbers[start])// A[mid] < A[start]，那么最小值一定在左半区间，譬如[7,0,1,2,4,5,6]，这件元素为2，2 < 7，我们继续在[7,0,1,2]这个区间查找
            stop = mid
    }
    return Math.min(numbers[start], numbers[stop])
}
