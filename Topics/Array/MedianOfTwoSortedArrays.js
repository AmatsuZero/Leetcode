/*
* There are two sorted arrays nums1 and nums2 of size m and n respectively.
* Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
* */

const findKth = (nums1, nums2, k) => {
    const m = nums1.length,
        n = nums2.length
    if (m > n) // 如果nums1的长度大于nums2的长度，交换一下
        return findKth(nums2, nums1, k)
    if (m === 0) // 然后我们要判断小的数组是否为空，为空的话，直接在另一个数组找第K个即可
        return nums2[k-1]
    if (k === 1) // 还有一种情况是当K = 1时，表示我们要找第一个元素，只要比较两个数组的第一个元素，返回较小的那个即可
        return Math.min(nums1[0], nums2[0])
    const i = Math.min(m, Math.trunc(k/2)), //二分查找
        j = Math.min(n, Math.trunc(k/2))
    if (nums1[i-1] > nums2[j-1])
        return findKth(nums1, nums2.slice(j), k-j)
    else
        return findKth(nums1.slice(i), nums2, k-i)
}

module.exports = (nums1, nums2) => {
    const m = nums1.length,
        n = nums2.length
    // 对于奇数的情况，直接找到最中间的数即可，偶数的话需要求最中间两个数的平均值
    // 两种情况都考虑一下，相加以后求平均值即可得出
    return Math.trunc(findKth(nums1, nums2, Math.trunc((m+n+1)/2))
        + findKth(nums1, nums2, Math.trunc((m+n+2)/2)))/2
}
