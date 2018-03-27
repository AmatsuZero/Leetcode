/*
Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You may assume no duplicates in the array.

Here are few examples.

[1,3,5,6], 5 → 2

[1,3,5,6], 2 → 1

[1,3,5,6], 7 → 4

[1,3,5,6], 0 → 0
* */

module.exports = (array, target) => {
    let low = 0
    let high = array.length - 1
    while (low <= high) {
        const mid = Math.floor((high+low)/2)
        if (target > array[mid])
            low = mid + 1
        else if (target < array[mid])
            high = mid - 1
        else
            return mid
    }
    return low
}
