/**********************************************************************************
 *
 * Given two strings s and t, write a function to determine if t is an anagram of s.
 *
 * For example,
 * s = "anagram", t = "nagaram", return true.
 * s = "rat", t = "car", return false.
 *
 * Note:
 * You may assume the string contains only lowercase alphabets.
 *
 **********************************************************************************/

module.exports = (s,t) => {
    const first = s.split("").sort()
    const second = t.split("").sort()
    if (first.length !== second.length)
        return false
    for (let i = 0; i < first.length; i++) {
        if (first[i] !== second[i])
            return false
    }
    return true
}
