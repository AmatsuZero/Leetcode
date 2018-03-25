/*
* Given an index k, return the kth row of the Pascal's triangle.
For example, given k = 3, Return [1,3,3,1].
Note:
Could you optimize your algorithm to use only O(k) extra space?
* */
module.exports = function (k) {
    let results = Array(k+1).fill(1)
    for (let i = 0; i < k+1; i++) {
        for (let j = i - 1; j>= 1; j--) {
            results[j] = results[j] + results[j-1]
        }
    }
    return results
}