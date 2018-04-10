/*
* There are N children standing in a line. Each child is assigned a rating value.

You are giving candies to these children subjected to the following requirements:

Each child must have at least one candy. Children with a higher rating get more candies than their neighbors.

What is the minimum candies you must give?
* */

module.exports = ratings => {
    // 每人一颗糖
    let candies = new Array(ratings.length).fill(1)
    // 这个循环保证了右边高级别的孩子一定比左边孩子的糖果数量多
    for (let i = 1; i < ratings.length; i++)
        if (ratings[i] > ratings[i-1])
            candies[i] = candies[i-1] + 1

    // 保证左边高级别的孩子一定比右边孩子的糖果数量多
    for (let i = ratings.length - 2; i >= 0; i--)
        if (ratings[i] > ratings[i+1] && candies[i] <= candies[i+1])
            candies[i] = candies[i+1] + 1

    return candies.reduce((last, curr) => last + curr, 0)
}
