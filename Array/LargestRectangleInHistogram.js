// Source : https://oj.leetcode.com/problems/largest-rectangle-in-histogram/
/**********************************************************************************
 *
 * Given n non-negative integers representing the histogram's bar height where the width of each bar is 1,
 * find the area of largest rectangle in the histogram.
 *
 *                    6
 *                  +---+
 *               5  |   |
 *              +---+   |
 *              |   |   |
 *              |   |   |
 *              |   |   |     3
 *              |   |   |   +---+
 *        2     |   |   | 2 |   |
 *      +---+   |   |   +---+   |
 *      |   | 1 |   |   |   |   |
 *      |   +---+   |   |   |   |
 *      |   |   |   |   |   |   |
 *      +---+---+---+---+---+---+
 *
 * Above is a histogram where width of each bar is 1, given height = [2,1,5,6,2,3].
 *
 *
 *                    6
 *                  +---+
 *               5  |   |
 *              +-------|
 *              |-------|
 *              |-------|
 *              |-------|     3
 *              |-------|   +---+
 *        2     |-------| 2 |   |
 *      +---+   |-------|---+   |
 *      |   | 1 |-------|   |   |
 *      |   +---|-------|   |   |
 *      |   |   |-------|   |   |
 *      +---+---+---+---+---+---+
 *
 *
 * The largest rectangle is shown in the shaded area, which has area = 10 unit.
 *
 * For example,
 * Given height = [2,1,5,6,2,3],
 * return 10.
 *
 *
 **********************************************************************************/

module.exports = (heights) => {
    let sum = 0
    let s = []
    // 插入高度为0的Bar
    heights.push(0)
    let i = 0
    while (i < heights.length) {
        if (s.length === 0 || heights[i] > heights[s[s.length-1]]) {
            s.push(i)
            i++
        } else {
            const t = s[s.length-1]
            s.pop()
            // 考虑stack为空的情况
            sum = Math.max(sum, heights[t] * (s.length === 0 ? i: i - s[s.length-1] - 1))
        }
    }
    return sum
}
