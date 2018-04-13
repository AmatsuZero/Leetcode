/*
* Given a sorted array, remove the duplicates in place such that > each element appear only once and return the new count.
Do not allocate extra space for another array, you must do this in place with constant memory.

For example, Given input array A = [1,1,2],
Your function should return count = 2, and A is now [1,2].
* */

module.exports = function (sortedArray) {
    if (sortedArray.length === 0) return
    let j = 0
    for (let i = 1; i< sortedArray.length; i++) {
        if (sortedArray[j] !== sortedArray[i])
            sortedArray[++j] = sortedArray[i]
    }
    return j+1
}
