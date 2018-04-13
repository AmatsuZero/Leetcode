/*
 The Correct Way To Rank Up/Down Voted Items

 Let's say you have a collection of items, each of which have been rated thumbs positively or negatively a certain number of times. Maybe it's products on an e-commerce store, or links submitted to a popular hacker community.

 How do we rank them?

 Sorting by positive vs. negative % alone gives undue advantage to items with fewer ratings, whereas sorting by total number of positive ratings makes it difficult for new items to break into the top.

 Fortunately, there is a correct solution: use the lower bound of Wilson score confidence interval for a Bernoulli parameter.

 As eloquently described by Evan Miller:

 We need to balance the proportion of positive ratings with the uncertainty of a small number of observations. Fortunately, the math for this was worked out in 1927 by Edwin B. Wilson. What we want to ask is: Given the ratings I have, there is a 95% chance that the "real" fraction of positive ratings is at least what? Wilson gives the answer. Considering only positive and negative ratings (i.e. not a 5-star scale), the lower bound on the proportion of positive ratings is given by:

 $$\left ( \hat{p} + \frac{z^{2}_{\alpha/2}}{2n} \pm z_{\alpha/2} \sqrt{[\hat{p}(1 - \hat{p}) + z^{2}_{\alpha / 2} / 4n] / n} \right ) / (1 + z^{2}_{\alpha / 2} / n).$$

 Here p̂ is the observed fraction of positive ratings, zα/2 is the (1-α/2) quantile of the standard normal distribution, and n is the total number of ratings.
 */

const WilsonRankDefaultConfidenceLevel = 0.95

const InverseNormalCDF = (q) => {
    const b = [
        1.570796288,
        0.03706987906,
        -0.8364353589e-3,
        -0.2250947176e-3,
        0.6841218299e-5,
        0.5824238515e-5,
        -0.104527497e-5,
        0.8360937017e-7,
        -0.3231081277e-8,
        0.3657763036e-10,
        0.6936233982e-12
    ]
    if (q < 0.0 || 1.0 < q || q === 0.5) return 0.0
    let w1 = q
    if (q > 0.5) {
        w1 = 1.0 - q
    }
    const w3 = -Math.log(4.0 * w1 * (1.0 - w1))
    w1 = b[0]
    for (let i = 1; i < b.length; i++) {
        w1 += b[i] * Math.pow(w3, i)
    }
    return q > 0.5 ? Math.sqrt(w1 * w3) : -Math.sqrt(w1 * w3)
}

const WilsonConfidenceIntervalLowerBound = (positive, negative, confidence) => {
    const n = positive + negative
    if (n === 0) return 0.0
    const z = InverseNormalCDF(1.0 - confidence / 2.0)
    const p_hat = 1.0 * positive / n
    return (p_hat + z * z / (2.0 * n))
        - z * Math.sqrt((p_hat * (1.0 - p_hat) + z * z / (4.0 * n)) / n)
        / (1.0 + z * z / n)
}

module.exports = (positiveKey, negativeKey, ascending = true, confidence = WilsonRankDefaultConfidenceLevel) => (obj1, obj2) => {

    const up1 = typeof obj1[positiveKey] === 'string' ? parseInt(obj1[positiveKey]) : obj1[positiveKey]
    const up2 = typeof obj2[positiveKey] === 'string' ? parseInt(obj2[positiveKey]) : obj2[positiveKey]

    const down1 = typeof obj1[negativeKey] === 'string' ? parseInt(obj1[negativeKey]) : obj1[negativeKey]
    const down2 = typeof obj2[negativeKey] === 'string' ? parseInt(obj2[negativeKey]) : obj2[negativeKey]

    const wclib1 = WilsonConfidenceIntervalLowerBound(up1, down1, confidence)
    const wclib2 = WilsonConfidenceIntervalLowerBound(up2, down2, confidence)

    const ret = ascending ? 1 : -1

    if (wclib1 < wclib2) {
        return -1 * ret
    } else if (wclib1 > wclib2) {
        return ret
    } else {
        return 0
    }
}

