const { assert } = require('chai')
const {describe, it} = require('mocha')
const {
    CommonSort,
    WilsonRank,
    FullPermutation,
    CountSort
} = require("../Sort")
const {
    quickSort,
    bubbleSort,
    selectionSort,
    binaryInsertionSort,
    shellSort,
    mergeSort,
    heapSort
} = CommonSort

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
        assert.sameMembers(fruits, [
            {name: "apple", up: 77, down: 14},
            {name: "cherry", up: 28, down: 6},
            {name: "honeydew", up: 65, down: 26},
            {name: "elderberry", up: 81, down: 42},
            {name: "banana", up: 90, down: 78},
            {name: "fig", up: 70, down: 93},
            {name: "grape", up: 48, down: 89},
            {name: "duran", up: 2, down: 43}
        ])
        fruits.sort(WilsonRank('up', 'down', false)).forEach((fruit) => {
            console.log("%s (%d↑ / %d↓)", fruit.name, fruit.up, fruit.down)
        })
    })
})

describe('#Commmond Sort', () => {
    it('#简易版快排',  () => {
        const array = [85,24,63,45,17,31,96,50]
        assert.deepStrictEqual(quickSort(array), [17,24,31,45,50,63,85,96])
    })
    it('#改进版冒泡', () => {
        const array = [85,24,63,45,17,31,96,50]
        assert.deepStrictEqual(bubbleSort(array), [17,24,31,45,50,63,85,96])
    })
    it('#选择排序', () => {
        const array = [85,24,63,45,17,31,96,50]
        assert.deepStrictEqual(selectionSort(array), [17,24,31,45,50,63,85,96])
    })
    it('#二分查找版插入排序', () => {
        const array = [85,24,63,45,17,31,96,50]
        assert.deepStrictEqual(binaryInsertionSort(array), [17,24,31,45,50,63,85,96])
    })
    it('#希尔排序', () => {
        const array = [85,24,63,45,17,31,96,50]
        assert.deepStrictEqual(shellSort(array), [17,24,31,45,50,63,85,96])
    })
    it('#归并排序', () => {
        const array = [85,24,63,45,17,31,96,50]
        assert.deepStrictEqual(mergeSort(array), [17,24,31,45,50,63,85,96])
    })
    it('#堆排序',  () => {
        const array = [85,24,63,45,17,31,96,50]
        assert.deepStrictEqual(heapSort(array), [17,24,31,45,50,63,85,96])
    });
    it("#全排序", () => {
        const input = [1,5,9]
        console.log(FullPermutation(input))
    })
})

describe('#计数排序', () => {
    it('#计数排序', () => {
        const input = [95, 94, 91, 98, 99, 90, 99, 93, 91, 92]
        assert.deepStrictEqual(CountSort(input), [90,91,91,92,93,94,95,98,99,99])
    })
})
