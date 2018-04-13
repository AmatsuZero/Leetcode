/*
*Given an array S of n integers, are there elements a, b, c and d in S such that a+b+c+d = target? Find all unique quadruplets in the array which gives the sume of target.
Note:
Elements in quadruplets (a, b, c, d) must be in non-descending order. (ie, a<=b<=c<=d)
The solution must not contain duplicates quadruplets.
* */

module.exports = (num, target) => {
    let ret = []
    if (num.length <= 3) return ret
    //cause we need the result in quadruplets should be non-descending
    const length = num.sort().length
    for (let i = 0; i < length - 3; i++) {
        if (i > 0 && num[i] === num[i-1]) continue
        for (let j = i + 1; j < length - 2; j++) {
            if (j > i + 1 && num[j] === num[j-1]) continue
            let k = i + 1
            let l = length - 1
            while (k < l) {
                const sum = num[i] + num[j] + num[k] + num[l]
                if (sum === target) {
                    const curr = []
                    curr.push(num[i])
                    curr.push(num[j])
                    curr.push(num[k])
                    curr.push(num[l])
                    ret.push(curr)
                    //the two while loops are used to skip the duplication solutions
                    do {
                        ++k
                    } while (k < l && num[k] === num[k-1])
                    do {
                        l--
                    } while (k < l && num[l] === num[l+1])
                } else if (sum < target) k++
                else l--
            }
        }
    }
    return ret
}