/**********************************************************************************
 *
 * Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle
 * containing all ones and return its area.
 *
 * For example, given the following matrix:

    1 0 1 0 0
    1 0 1 1 1
    1 1 1 1 1
    1 0 0 1 0

    Return 6.
 **********************************************************************************/

const largestRectangle = require('./LargestRectangleInHistogram')

module.exports = (matrix) => {
    if (matrix.length === 0 || matrix[0].length === 0) return 0
    const m = matrix.length
    const n = matrix[0].length
    let maxArea = 0
    const heights = new Array(m).fill(Array(n).fill(0))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                heights[i][j] = i === 0 ? 1 : heights[i][j] + 1
            }
        }
        maxArea = Math.max(maxArea, largestRectangle(heights[i]))
    }
    return maxArea
}
