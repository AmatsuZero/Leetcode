/*
* Say	you	have	an	array	for	which	the	ith	element	is	the	price	of	a	given	stock on	day	i.
Design	an	algorithm	to	find	the	maximum	profit.	You	may	complete	as	many transactions	as	you	like
(ie,	buy	one	and	sell	one	share	of	the	stock	multiple times).
However,	you	may	not	engage	in	multiple	transactions at	the	same time	(ie,	you	must	sell	the	stock	before	you	buy	again).

* */

module.exports = prices => {
	if (prices.length <= 1) return 0
	let minP = prices[0]
	let profit = prices[1] - prices[0]
	for(let i = 2; i < prices.length; i++) {
		minP = Math.min(prices[i-1], minP)
		profit = Math.max(profit, prices[i] - minP)
	}
	if (profit < 0) return 0
	return profit
}