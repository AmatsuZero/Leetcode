/*
Given two binary trees, write a function to check if they are equal or not.
Two binary trees are considered equal if they are structurally identical and the nodes have the same values.
* */

const compare = (p, q) => {
    if (p === null && q === null) return true
    else if (p === null || q === null) return false
    if (p.val === q.val) {
        return compare(p.left, q.left) && compare(p.right, q.right)
    }
    return false
}

module.exports = (p, q) => {
    return compare(p, q)
}
