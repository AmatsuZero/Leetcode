/*
* Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. Return the sum of the three integers. You man assume that each input would have exactly one solution.
* */
// solution:  http://en.wikipedia.org/wiki/3SUM
//the idea as blow:
//  1) sort the array.
//  2) take the element one by one, calculate the two numbers in reset array.
//
//notes: be careful the duplication number.
//
// for example:
//    [-4,-1,-1,1,2]    target=1
//
//    take -4, can calculate the "two number problem" of the reset array [-1,-1,1,2] while target=5
//    [(-4),-1,-1,1,2]  target=5  distance=4
//           ^      ^
//    because the -1+2 = 1 which < 5, then move the `low` pointer(skip the duplication)
//    [(-4),-1,-1,1,2]  target=5  distance=2
//                ^ ^
//    take -1(skip the duplication), can calculate the "two number problem" of the reset array [1,2] while target=2
//    [-4,-1,(-1),1,2]  target=2  distance=1
//                ^ ^
module.exports = function (num, target) {
    if (num.length <= 2) return -1
    let distance = Infinity
    let result = 0
    //Sort the array
    const n =  num.sort().length - 2
    for (let i = 0; i < n; i++) {
        let j = i + 1
        let k = num.length - 1
        while (j < k) {
            const tmpVal = num[i] + num[j] + num[k]
            let tmpDistance = 0
            if (tmpVal < target) {
                tmpDistance = target - tmpVal
                if (tmpDistance < distance) {
                    distance = tmpDistance
                    result = tmpVal
                }
                j++
            } else if (tmpVal > target) {
                tmpDistance = tmpVal - target
                if (tmpDistance < distance) {
                    distance = tmpDistance
                    result = tmpVal
                }
                k--
            } else {
                result = tmpVal
                return result
            }
        }
    }
    return result
}