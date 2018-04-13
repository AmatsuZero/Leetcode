/*
* There are N gas stations along a circular route, where the amount of gas at station i is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from station i to its next station (i+1). You begin the journey with an empty tank at one of the gas stations.

Return the starting gas station's index if you can travel around the circuit once, otherwise return -1.

Note: The solution is guaranteed to be unique.
* */

module.exports = (gas, cost) => {
    let sum = 0,
        total = 0,
        k = 0
    for(let i = 0; i < gas.length; i++) {
        sum += gas[i] - cost[i]
        // 小于0就只可能在i+1或者之后了
        if (sum < 0) {
            k = i + 1
            sum = 0
        }
        total += gas[i] - cost[i]
    }
    if (total < 0)
        return -1
    else
        return k
}
