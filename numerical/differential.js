export class Differential {
    static differentiate(f, x, h = 1e-5) {
        return (f(x + h) - f(x - h)) / (2 * h);
    }

    static trapezoidal(f, a, b, n = 100) {
        let h = (b - a) / n;
        let sum = 0.5 * (f(a) + f(b));
        for (let i = 1; i < n; i++) sum += f(a + i * h);
        return sum * h;
    }
}
