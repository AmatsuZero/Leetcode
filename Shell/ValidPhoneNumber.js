/*
link: https://leetcode.com/problems/valid-phone-numbers/description/

* Given a text file file.txt that contains list of phone numbers (one per line), write a one liner bash script to print all valid phone numbers.

You may assume that a valid phone number must appear in one of the following two formats: (xxx) xxx-xxxx or xxx-xxx-xxxx. (x means a digit)

You may also assume each line in the text file must not contain leading or trailing white spaces.

For example, assume that file.txt has the following content:

987-123-4567
123 456 7890
(123) 456-7890

Your script should output the following valid phone numbers:

987-123-4567
(123) 456-7890
* */
const util = require('util');
const exec = util.promisify(require('child_process').exec)

module.exports = async (path) => {
    const sh = `grep -P "^(\\d{3}-|\\(\\d{3}\\) )\\d{3}-\\d{4}$" ${path}`
    const { stdout, stderr } = await exec(sh)
    if (stderr && stderr.length > 0) console.error(`stderr: ${stderr}`)
    return stdout
}
