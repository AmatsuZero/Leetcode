/*
* Given	a	binary	tree,	return	all	root-to-leaf	paths.
For	example,	given	the	following	binary	tree:

			1
		/	\
	2		3
	\
	5

All	root-to-leaf	paths	are:
["1->2->5",	"1->3"]
* */



const BFS = (node, path, result) => {
	if (!node) return
	path.push(node.val)
	if (!node.left && !node.right)
		result.push(path.reduce((last, cur) => last.length > 0
			? last + `->${cur}`
			: last + cur, ""))
	else {
		if (node.left) {
			BFS(node.left, path, result)
			path.pop()
		}
		if (node.right) {
			BFS(node.right, path, result)
			path.pop()
		}
	}
}

module.exports = (root) => {
	const result = []
	if (!root) return result
	const path = []
	BFS(root, path, result)
	return result
}