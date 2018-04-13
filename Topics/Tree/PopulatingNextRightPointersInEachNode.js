/*
Given a binary tree
    struct TreeLinkNode {
      TreeLinkNode *left;
      TreeLinkNode *right;
      TreeLinkNode *next;
    }
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

Note:

You may only use constant extra space. You may assume that it is a perfect binary tree (ie, all leaves are at the same level, and every parent has two children).

For example, Given the following perfect binary tree

        1
       /  \
      2    3
     / \  / \
    4  5  6  7

After calling your function, the tree should look like:

         1 -> NULL
       /  \
      2 -> 3 -> NULL
     / \  / \
    4->5->6->7 -> NULL

* */

module.exports = (root) => {
    if (root === null) return
    let p = root, first = null
    while (p !== null) {
        // 记录下层第一个左子树
        if(first === null)
            first = p.left
        // 如果有左子树，那么next就是父节点
        if (p.left !== null)
            p.left.next = p.right
        else
            break
        // 如果有next，那么设置右子树的next
        if (p.next !== null) {
            p.right.next = p.next.left
            p = p.next
        } else {
            // 转到下一层
            p = first
            first = null
        }
    }
}
