const assert = require('assert')
const {describe, it} = require('mocha')
const wordFrequency = require('../Shell/WordFrequency')

describe('#Shell', () => {

    describe('https://leetcode.com/problems/word-frequency/description/', () => {
        it('#Read from the file words.txt and output the word frequency list to stdout', async () => {
            let result = await wordFrequency('words.txt')
            assert.strictEqual(result, 'the 4 \n is 3\n sunny 2\n day 1\n')
        })
    })
})