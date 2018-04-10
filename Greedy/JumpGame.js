/*
* Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

For example: A = [2,3,1,1,4], return true.

A = [3,2,1,0,4], return false.
* */


module.exports = steps => {
    if (steps.length === 0)
        return true
    let v = steps[0]
    for (let i = 1; i < steps.length; i++) {
        v--
        if (v < 0)
            return false
        if (v < steps[i])
            v = steps[i]
    }
    return true
}
