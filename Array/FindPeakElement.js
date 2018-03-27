/*
A peak element is an element that is greater than its neighbors.

Given an input array where num[i] ≠ num[i+1], find a peak element and return its index.

The array may contain multiple peaks, in that case return the index to any one of the peaks is fine.

You may imagine that num[-1] = num[n] = -∞.

For example, in array [1, 2, 3, 1], 3 is a peak element and your function should return the index number 2.
* */

module.exports = (num) => {
    const n = num.length
    if (n === 1) return 0
    let start = 0
    let end = n - 1
    let mid = 0
    while (start <= end) {
        mid = Math.floor((start+end)/2)
        if (mid === 0 || num[mid] >= num[mid-1] && (mid === n - 1 || num[mid] >= num[mid+1])) return mid
        else if (mid > 0 && num[mid-1] > num[mid])
            end = mid - 1
        else
            start = mid + 1
    }
    return mid
}
