const assert = require('assert')
const {describe, it} = require('mocha')
const wordFrequency = require('../Shell/WordFrequency')
const validPhoneNumber = require('../Shell/ValidPhoneNumber')
const path = require('path')
const resourcePath = path.join(__dirname, 'TestResource')

describe('Shell', () => {

    describe('#Word Frequency', () => {
        const file = path.join(resourcePath, 'words.txt')
        it('#Read from the file words.txt and output the word frequency list to stdout', async () => {
            const result = await wordFrequency(file)
            assert.strictEqual(result, 'the 4\nis 3\nsunny 2\nday 1\n')
        })
    })

    describe('#Valid Phone Number', () => {
        const file = path.join(resourcePath, 'file.txt')
        it('#Given a text file file.txt that contains list of phone numbers (one per line), write a one liner bash script to print all valid phone numbers', async () => {
            const result = await validPhoneNumber(file)
            assert.strictEqual(result, '987-123-4567\n(123) 456-7890')
        })
    })
})
