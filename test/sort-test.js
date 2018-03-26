const assert = require('assert')
const {describe, it} = require('mocha')

const wilsonRank = require('../Sort/WilsonRank')

describe('#Wilson Rank', () => {
    it('#Sort by Bernoulli Distribution', () => {
        let fruits = [
            {name: "apple", up: 77, down: 14},
            {name: "banana", up: 90, down: 78},
            {name: "cherry", up: 28, down: 6},
            {name: "duran", up: 2, down: 43},
            {name: "elderberry", up: 81, down: 42},
            {name: "fig", up: 70, down: 93},
            {name: "grape", up: 48, down: 89},
            {name: "honeydew", up: 65, down: 26}
        ]
        fruits.sort(wilsonRank('up', 'down', false)).forEach((fruit) => {
            console.log("%s (%d↑ / %d↓)", fruit.name, fruit.up, fruit.down)
        })
        assert.deepStrictEqual(fruits, [
            {name: "apple", up: 77, down: 14},
            {name: "cherry", up: 28, down: 6},
            {name: "honeydew", up: 65, down: 26},
            {name: "elderberry", up: 81, down: 42},
            {name: "banana", up: 90, down: 78},
            {name: "fig", up: 70, down: 93},
            {name: "grape", up: 48, down: 89},
            {name: "duran", up: 2, down: 43}
        ])
    })
})
