/*
* Given two sorted integer arrays A and B, merge B into A as one sorted array.

Note: You may assume that A has enough space (size that is greater or equal to m + n) to hold additional elements from B. The number of elements initialized in A and B are m and n respectively.
* */

module.exports = function (sortedArrayA, sortedArrayB) {
    let i = sortedArrayA.length + sortedArrayB.length - 1
    let j = sortedArrayA.length - 1
    let k = sortedArrayB.length - 1
    while (i >= 0) {
        if (j >= 0 && k >= 0) {
            if (sortedArrayA[j] > sortedArrayB[k]) {
                sortedArrayA[i] = sortedArrayA[j]
                j--
            } else {
                sortedArrayA[i] = sortedArrayB[k]
                k--
            }
        } else if (j >= 0) {
            sortedArrayA[i] = sortedArrayA[j]
            j--
        } else if (k >= 0) {
            sortedArrayA[i] = sortedArrayB[k]
            k--
        }
        i--
    }
    return sortedArrayA
}