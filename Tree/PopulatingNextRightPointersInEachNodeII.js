/*
What if the given tree could be any binary tree? Would your previous solution still work?

Note:

You may only use constant extra space. For example, Given the following binary tree,

         1
       /  \
      2    3
     / \    \
    4   5    7
After calling your function, the tree should look like:


         1 -> NULL
       /  \
      2 -> 3 -> NULL
     / \    \
    4-> 5 -> 7 -> NULL
* */

module.exports = (root) => {
    if (root === null) return
    let p = root, first = null, last = null
    while (p !== null) {
        if (first === null) {
            if (p.left !== null)
                first = p.left
            else if (p.right !== null)
                first = p.right
        }
        if (p.next !== null) {
            if (last !== null) // 如果last不为空，则设置last的next
                last.next = p.left
            // last为left
            last = p.next
        }
        if (p.right !== null) {
            if (last !== null) // 如果last不为空，则设置last的next
                last.next = p.right
            last = p.right
        }
        if (p.next !== null) // 如果有next，则转到next
            p = p.next
        else {
            p = first
            last = null
            first = null
        }
    }
}
