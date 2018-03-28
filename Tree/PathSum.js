/*
Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

For example: Given the below binary tree and sum = 22

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1

return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.*/

const DFS = (target, sum, root) => {
    if (root === null) return false
    sum += root.val
    if (root.left === null && root.right === null) {
        return sum === target
    }
    return DFS(target, sum, root.left) || DFS(target, sum, root.right)
}

module.exports = (root, target) => {
    if (root === null) return false
    return DFS(target, 0, root)
}
