/*
*   Suppose a sorted array is rotated at some pivot unknown to you beforehand.
    (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).
    Find the minimum element.
    The array may contain duplicates.
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
        if (numbers[mid] > numbers[start])
            start = mid
        else if (numbers[mid] < numbers[start])
            stop = mid
        else //A[mid] = A[start] 出现这种情况，我们跳过start，重新查找，譬如[2,2,2,1]，A[mid] = A[start]都为2，这时候我们跳过start，使用[2,2,1]继续查找
            start++
    }
    return Math.min(numbers[start], numbers[stop])
}
