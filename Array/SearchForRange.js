/*
Given a sorted array of integers, find the starting and ending position of a given target value.

Your algorithm's runtime complexity must be in the order of O(log n).

If the target is not found in the array, return [-1, -1].

For example,

    Given [5, 7, 7, 8, 8, 10] and target value 8,

    return [3, 4]
*/

const binarySearch = (array, low, high, key) => {
    while (low <= high) {
        const mid = Math.floor((high+low)/2)
        if (array[mid] === key) return mid
        if (key > array[mid])
            low = mid + 1
        if (key < array[mid])
            high = mid - 1
    }
    return -1
}

module.exports = (array, target) => {
    let pos = binarySearch(array, 0, array.length-1, target)
    const ret = []
    let low = -1, high
    if (pos < 0) return [-1,-1]
    low = high = pos
    let l = low
    do {
        low = l
        l = binarySearch(array, 0, low-1, target)
    } while (l >= 0)

    let h = high
    do {
        high = h
        h = binarySearch(array, high+1, array.length-1, target)
    } while (h >= 0)

    ret.push(low, high)
    return ret
}
