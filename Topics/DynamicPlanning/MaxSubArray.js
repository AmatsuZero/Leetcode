/*
Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

For example, given the array [−2,1,−3,4,−1,2,1,−5,4], the contiguous subarray [4,−1,2,1] has the largest sum = 6.
* */

const divide = (A, left, right, tmax) => {
    if (left > right) return -Infinity
    let mid = left + ~~((right - left)/2)
    // 得到子区间[left, mid-1]最大值
    const lmax = divide(A, left, mid-1, tmax)
    // 得到子区间[mid+1, right]最大值
    const rmax = divide(A, mid+1, right, tmax)

    tmax = Math.max(tmax, lmax)
    tmax = Math.max(tmax, rmax)

    let sum = 0,
        mlmax = 0
    //得到[left, mid-1]最大值
    for(let i = mid - 1; i >= left; i--) {
        sum += A[i]
        mlmax = Math.max(mlmax, sum)
    }

    sum = 0
    let mrmax = 0
    // 得到[mid+1, right]最大值
    for(let i = mid + 1; i <= right; i++) {
        sum += A[i]
        mrmax = Math.max(mrmax, sum)
    }
    tmax = Math.max(tmax, A[mid] + mlmax + mrmax)
    return tmax
}

module.exports = arr => divide(arr, 0, arr.length-1, -Infinity)
