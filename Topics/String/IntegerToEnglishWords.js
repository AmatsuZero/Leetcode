/*
 *
 * Convert a non-negative integer to its english words representation. Given input is
 * guaranteed to be less than 2^31 - 1.
 *
 * For example,
 *
 * 123 -> "One Hundred Twenty Three"
 * 12345 -> "Twelve Thousand Three Hundred Forty Five"
 * 1234567 -> "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
 *
 *   Did you see a pattern in dividing the number into chunk of words? For example, 123
 * and 123000.
 *
 *   Group the number by thousands (3 digits). You can write a helper function that
 * takes a number less than 1000 and convert just that chunk to words.
 *
 *   There are many edge cases. What are some good test cases? Does your code work with
 * input such as 0? Or 1000010? (middle chunk is zero and should not be printed out)
* */

const unit = ["Zero","One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"]
const decade = ["","", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
const high = ["Hundred", "Thousand", "Million", "Billion"]

// This function only converts the number which less than 1000
const numberLess1000ToWords = num => {
    let result = ""
    if (num === 0)
        return result
    else if (num < 20)
        return unit[num]
    else if (num < 100) {
        result = decade[Math.trunc(num/10)]
        if (num % 10 > 0)
            result += " " + unit[Math.trunc(num%10)]
    } else {
        result = unit[Math.trunc(num/100)] + " " + high[0]
        if (num % 100 > 0)
            result += " " + numberLess1000ToWords(Math.trunc(num % 100))
    }
    return result
}

module.exports = num => {
    if (num === 0) return unit[num]
    const ret = []
    for (; num > 0; num=Math.trunc(num/1000))
        ret.push(numberLess1000ToWords(Math.trunc(num%1000)))
    let result = ret[0]
    for (let i = 1; i < ret.length; i++) {
        if (ret[i].length > 0) {
            if (result.length > 0)
                result = ret[i] + " " + high[i] + " " + result
            else
                result = ret[i] + " " + high[i]
        }
    }
    return result
}
