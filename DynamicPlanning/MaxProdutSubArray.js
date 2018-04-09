/*
* Find the contiguous subarray within an array (containing at least one number) which has the largest product.

For example, given the array [2,3,-2,4], the contiguous subarray [2,3] has the largest product = 6.
* */

module.exports = arr => {
    if (arr.length === 0)
        return 0
    else if (arr.length === 1)
        return arr[0]
    let p = arr[0],
        maxP = arr[0],
        minP = arr[0]
    for (let i = 1; i < arr.length; i++) {
        let t = maxP
        maxP = Math.max(Math.max(maxP * arr[i], arr[i]), minP * arr[i])
        minP = Math.min(Math.min(t * arr[i], arr[i]), minP * arr[i])
        p = Math.max(maxP, p)
    }
    return p
}
