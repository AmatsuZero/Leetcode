/*
Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

For example, Given nums = [0, 1, 3] return 2.

Note: Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?
* */

module.exports = (nums) => {
    let x = 0
    // This problem can be converted to the classic problem --
    // `There is an array, all of numbers except one appears twice, and that one only appears once`
    // It means, we can combine two arrays together, one is [1..n], another one is `nums`.
    // Then, you know, we can use the XOR solve this problem.
    nums.forEach((value, i) => x = x ^ (i+1) ^ value)
    return x
}
