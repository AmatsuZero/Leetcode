/*
Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

Integers in each row are sorted from left to right. The first integer of each row is greater than the last integer of the previous row. For example,

Consider the following matrix:

[
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]

 Given target = 3, return true.
* */

module.exports = (matrix, target) => {
    if (matrix.length === 0) return false
    else if (matrix[0].length === 0) return false
    let rowNumber = 0
    let colNumber = matrix[0].length - 1
    while (rowNumber < matrix.length && colNumber >= 0) {
        if (target < matrix[rowNumber][colNumber])
            colNumber--
        else if (target > matrix[rowNumber][colNumber])
            rowNumber++
        else
            return true
    }
    return false
}
