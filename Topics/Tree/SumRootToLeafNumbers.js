/*
* Given	a	binary	tree	containing	digits	from	0-9	only,	each	root-to-leaf	path could	represent	a	number.	An	example	is	the	root-to-leaf	path		1->2->3	which	represents	the	number		123	.	Find	the	total	sum	of	all	root-to-leaf numbers.	For	example,
				1
			/	\
	   2	3

The	root-to-leaf	path	1->2  represents	the	number 12	.
The	root-to-leaf path		1->3  represents	the	number 13	.
Return	the	sum	=	12	+	13	=	25.
* */
const DFS = (node, arr, sum) => {
	if (!node) return
	arr.push(node.val)
	if(!node.left && !node.right) {
		sum.push(arr.reduce((last, cur) => last + cur, 0))
	} else {
		if(node.left)
			DFS(node.left, arr, sum)
		if(node.right)
			DFS(node.right, arr, sum)
	}
	arr.pop()
}

module.exports = root => {
	const arr = []
	let sum = []
	DFS(root, arr, sum)
	return sum.reduce((last, cur) => last + cur, 0)
}