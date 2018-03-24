/*
*Follow up for "Remove Duplicates": What if duplicates are allowed at most twice?
For example, Given sorted array A = [1,1,1,2,2,3],
Your function should return length = 5, and A is now [1,1,2,2,3].
* */

module.exports = function (sortedArray) {
    if (sortedArray.length === 0) return
    let j = 0
    let counter = 0
    for (let i = 1; i < sortedArray.length; i ++) {
        if (sortedArray[j] === sortedArray[i]) {
            counter++
            if (counter < 2) {
                sortedArray[++j] = sortedArray[i]
            }
        } else {
            sortedArray[++j] = sortedArray[i]
            counter = 0
        }
    }
    return j+1
}