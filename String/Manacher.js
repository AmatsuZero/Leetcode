const processedString = str => {
    // start string with $# to help with the next step
    let string = "$#"
    // insert # between characters to remove trivality of even/noneven strings
    str.split("").forEach(char => string += `${char}#`)
    return string + "@"
}

const longestPalindrome = (str, palindromeArray) => {
    let length = 0, // length of longest palindrome
        center = 0 // current center index of character used for palindrome
    for (let i = 1; i < palindromeArray.length - 1; i++) {
        if (palindromeArray[i] > length) {
            length = palindromeArray[i]
            center = i
        }
    }
    const start = (center-1-length)/2+1,
        end = (center-1+length)/2+1
    const finalString = str.replace(/#/gi, "")
    return finalString.substring(start, end)
}

const findLargestPalindrome = str => {
    const palindrome = new Array(str.length).fill(0)
    let center = 0, right = 0
    for (let i = 0; i < str.length - 1; i++) {
        let mirror = 2 * center - i
        if (right > i)
            palindrome[i] = Math.min(right - i, palindrome[mirror])
        let comp1 = str.charAt(i+1+palindrome[i]),
            comp2 = str.charAt(i-1+palindrome[i])
        while (comp1 === comp2) { // expand palindrome around i
            palindrome[i] = palindrome[i] + 1
            comp1 = str.charAt(i+1+palindrome[i])
            comp2 = str.charAt(i-1+palindrome[i])
        }
        if (i + palindrome[i] > right) { // adjust center if expands beyond right bounds
            center = i
            right = i + palindrome[i]
        }
    }
    return longestPalindrome(str, palindrome)
}

const longestPalindromeLength = str => {
    const pal = []
    for (let i = 0; i < str.length; i++)
        pal.push(new Array(3).fill(false))
    let maxLength = 0
    for(let i = 0; i < str.length; i++) {
        let j = i
        while (j >= 0) {
            if (str.charAt(i) === str.charAt(j) && (i-j<2||pal[j+1][i-1])) {
                pal[i][j] = true
                maxLength = Math.max(maxLength, i-j+1)
            }
            j--
        }
    }
    return maxLength
}

module.exports = {
    longestPalindrome: (str, caseIgnored = true) => findLargestPalindrome(processedString(caseIgnored ? str.toUpperCase() : str)),
    longestPalindromeLength
}
