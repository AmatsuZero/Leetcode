const { assert } = require('chai')
const { describe, it } = require('mocha')
const missingNumber = require('../Bit Manipulation/MissingNumber')
const hammingWeight = require('../Bit Manipulation/NumberOfBits')
const BloomFilter = require('../Bit Manipulation/BloomFilter')

describe('#Missing Number', () => {
    it('#位运算解法', () => {
        assert.strictEqual(missingNumber([0,1,2,4,5]), 3)
    })
})

describe('#Number of Bits', () => {
    it('给出一个整数，求它包含二进制1的位数', () => {
        assert.strictEqual(hammingWeight(11), 3)
    })
})


describe('#布隆过滤器', () => {
    it('#Basic', () => {
        const filter = new BloomFilter(1000,4),
            n1 = "Bess",
            n2 = "Jane"
        filter.add(n1)
        assert.isOk(filter.test(n1))
        assert.isNotOk(filter.test(n2))
    })

    it('#Jabberwocky', () => {
        const jabberwocky = "`Twas brillig, and the slithy toves\n  " +
            "Did gyre and gimble in the wabe:\nAll mimsy were the borogoves,\n  " +
            "And the mome raths outgrabe.\n\n\"Beware the Jabberwock, my son!\n  " +
            "The jaws that bite, the claws that catch!\nBeware the Jubjub bird, and shun\n  " +
            "The frumious Bandersnatch!\"\n\nHe took his vorpal sword in hand:\n  " +
            "Long time the manxome foe he sought --\nSo rested he by the Tumtum tree,\n  " +
            "And stood awhile in thought.\n\nAnd, as in uffish thought he stood,\n  The Jabberwock, with eyes of flame,\nCame whiffling through the tulgey wood,\n  " +
            "And burbled as it came!\n\nOne, two! One, two! And through and through\n  The vorpal blade went snicker-snack!\nHe left it dead, and with its head\n  " +
            "He went galumphing back.\n\n\"And, has thou slain the Jabberwock?\n  " +
            "Come to my arms, my beamish boy!\nO frabjous day! Callooh! Callay!'\n  " +
            "He chortled in his joy.\n\n`Twas brillig, and the slithy toves\n  Did gyre and gimble in the wabe;\nAll mimsy were the borogoves,\n  And the mome raths outgrabe."
        const filter = new BloomFilter(1000,4),
            n2 = jabberwocky + '\n'
        filter.add(jabberwocky)
        assert.isOk(filter.test(jabberwocky))
        assert.isNotOk(filter.test(n2))
    })

    it('#Basic Unit32', () => {
        const f = new BloomFilter(1000, 4),
            n1 = "\u0100",
            n2 = "\u0101",
            n3 = "\u0103"
        f.add(n1)
        assert.isOk(f.test(n1))
        assert.isNotOk(f.test(n2))
        assert.isNotOk(f.test(n3))
    })

    it('#WTF', () => {
        const f = new BloomFilter(20, 10)
        f.add("abc")
        assert.isNotOk(f.test("wtf"))
    })

    it('#works with integer types', () => {
        const f = new BloomFilter(1000, 4)
        f.add(1)
        assert.isOk(f.test(1))
        assert.isNotOk(f.test(2))
    })

    it('#size', () => {
        const f = new BloomFilter(1000, 4)
        for (let i = 0; i < 100; ++i)
            f.add(i);
        assert.closeTo(f.size, 99.953102, 1e-6);
        for (let i = 0; i < 1000; ++i)
            f.add(i);
        assert.closeTo(f.size, 950.424571, 1e-6)
    })
})
