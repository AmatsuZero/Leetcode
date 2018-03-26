// Link: http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
const quickSort = (array) => {
    if (array.length <= 1) return array
    const pivotIndex = Math.floor(array.length/2)
    const pivot = array.splice(pivotIndex, 1)[0]
    let left = []
    let right = []
    array.forEach(value => {
        if (value < pivot) {
            left.push(value)
        } else {
            right.push(value)
        }
    })
    return quickSort(left).concat([pivot], quickSort(right))
}

const swapAt = (array, x, y) => {
    const temp = array[x]
    array[x] = array[y]
    array[y] = temp
}

// 双向冒泡
const bubbleSort = (array) => {
    if (array.length <= 1) return array
    let low = 0
    let high = array.length - 1
    while (low < high) {
        let left = low + 1
        let right = high - 1
        for (let j = low; j < high; j++) {// 正向冒泡，找最大值
            if (array[j] > array[j+1]) {
                swapAt(array, j, j+1)
                right = j
            }
        }
        high = right
        for (let i = high; i > low; i--) {// 反向冒泡，找最小值
            if (array[i] < array[i-1]) {
                swapAt(array, i, i-1)
                left = i
            }
        }
        low = left
    }
    return array
}

const selectionSort = (array) => {
    if (array.length <= 1) return array
    let highBound = array.length
    for (let i = 0; i < highBound; i++) {
        let minIndex = i
        for (let j = i + 1; j < highBound; j++) {
            if (array[j] < array[minIndex]) //寻找最小的数
                minIndex = j //将最小的数的索引保存
        }
        swapAt(array, i, minIndex)
    }
    return array
}

const binaryInsertionSort = (array) => {
    if (array.length <= 1) return array
    for (let i = 1; i < array.length; i++) {
        let key = array[i], left = 0, right = i - 1
        while (left <= right) {
            let middle = Math.floor((left + right) / 2)
            if (key < array[middle])
                right = middle - 1
            else
                left = middle + 1
        }
        for (let j = i - 1; j >= left; j--) {
            array[j+1] = array[j]
        }
        array[left] = key
    }
    return array
}

const shellSort = (array) => {
    if (array.length <= 1) return array
    let gap = 1
    const length = array.length
    while (gap < Math.floor(length/5)) {
        gap = gap * 5 + 1 // 动态定义间隔序列
    }
    do {
        for (let i = gap; i < length; i++) {
            let temp = array[i]
            let lastIndex = 0
            for (let j = i - gap; j >= 0; j -= gap) {
                if (array[j] > temp) {
                    array[j+gap] = array[j]
                    lastIndex = j
                }
            }
            array[lastIndex+gap] = temp
        }
        gap = Math.floor(gap/5)
    } while (gap > 0)
    return array
}

const merge = (left, right) => {
    let result = []
    while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    return result.concat(left).concat(right)
}

const mergeSort = (array) => {
    if (array.length < 2) return array
    const middle = Math.floor(array.length/2)
    const left = array.slice(0, middle)
    const right = array.slice(middle, array.length)
    return merge(mergeSort(left), mergeSort(right))
}

//对大顶堆的局部进行调整，使其该节点符合大顶堆的特点
const heapAdjust = (startIndex, endIndex, array) => {
    const temp = array[startIndex]
    let fatherIndex = startIndex+1 // 父节点下标
    let maxChildrenIndex = 2 * fatherIndex // 左孩子下标
    while (maxChildrenIndex <= endIndex) {
        // 比较左右孩子并找出比较大的下标
        if (maxChildrenIndex < endIndex && array[maxChildrenIndex-1] < array[maxChildrenIndex])
            maxChildrenIndex += 1
        // 如果较大的那个节点比根节点大，就将该节点的值赋给父节点
        if (temp < array[maxChildrenIndex-1]) break
        array[fatherIndex-1] = array[maxChildrenIndex-1]
        fatherIndex = maxChildrenIndex
        maxChildrenIndex = 2 * fatherIndex
    }
    array[fatherIndex-1] = temp
}

const heapCreate = (array) => {
    let tmp = Array.from(array)
    for (let i = tmp.length-1; i > 0; i--)
        heapAdjust(i-1, tmp.length-1, tmp)
    return tmp
}

const heapSort = (array) => {
    if (array.length <= 1) return array
    //创建大顶堆， 其实就是数组转换成大顶堆层次的遍历结果
    let newArray = heapCreate(array)
    for (let i = newArray.length-1; i > 0; i--) {
        //将大顶堆的定点（最大的那个值）与大顶堆的最后一个元素进行交换
        swapAt(newArray, i, 0)
        //对交换后的大顶堆进行调整，使其成为大顶堆
        heapAdjust(0, i, newArray)
    }
    return newArray
}

module.exports = {
    quickSort,
    bubbleSort,
    selectionSort,
    binaryInsertionSort,
    shellSort,
    mergeSort,
    heapSort
}
