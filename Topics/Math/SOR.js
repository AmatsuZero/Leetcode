// SOR

module.exports = (N, A, b, initialX, x, w, max, eps) => {

    const distance = (N, x, y) => {
        let s = 0

        for (let i = 0; i < N; i++)
            s += Math.pow(x[i] - y[i], 2)

        return Math.sqrt(s / N)
    }

    const update = (N, i, A, b, x, w) => {
        let s = 0

        for (let j = 0; j < N; j++) {
            if (i === j) continue

            s += A[i * N + j] * x[j]
        }
        return (1.0 - w) * x[i] + w * (b[i] - s) / A[i * N + i]
    }

    let converged = 0

    for (let i = 0; i < N; i++)
        x[i] = initialX[i]

    for (let iter = 0; iter < max; iter++) {
        const oldX = [...x]

        for (let i = 0; i < N; i++)
            x[i] = update(N, i, A, b, x, w)

        if (distance(N, x, oldX) < eps) {
            converged = 1

            break
        }
    }
    return converged
}