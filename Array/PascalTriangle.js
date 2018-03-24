/*
* Given numRows, generate the first numRows of Pascal's triangle.
For example, given numRows = 5, Return
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
* */

module.exports = function (numRows) {
    let triangle = Array(numRows)
    for (let i = 0; i< numRows; i++) {
        triangle[i] = Array(i+1)
        triangle[i][0] = 1
        triangle[i][i] = 1
        for (let j = 1; j < i; j++)
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
    }
    return triangle
}