export class RootFinding {
    static newtonRaphson(f, fprime, guess, tolerance = 1e-6, maxIterations = 100) {
        let x = guess, prev_x;
        for (let iter = 0; iter < maxIterations; iter++) {
            let f_val = f(x);
            let fprime_val = fprime(x);
            if (Math.abs(fprime_val) < 1e-12) throw new Error("Derivative too small.");

            prev_x = x;
            x = x - f_val / fprime_val;

            if (Math.abs(x - prev_x) <= tolerance) return x;
        }
        throw new Error("Max iterations reached.");
    }

    static secant(f, x0, x1, tolerance = 1e-6, maxIterations = 100) {
        let iter = 0;
        while (Math.abs(x1 - x0) > tolerance && iter < maxIterations) {
            let f_x0 = f(x0), f_x1 = f(x1);
            if (f_x0 === f_x1) throw new Error("Function values are equal.");

            let x_new = x1 - (x1 - x0) / (f_x1 - f_x0) * f_x1;
            x0 = x1;
            x1 = x_new;
            iter++;
        }
        return x1;
    }
}
