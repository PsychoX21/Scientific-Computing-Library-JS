export class LinearSolvers {
    static jacobi(A, b, x, iterations, tolerance, verbose = false) {
        let n = x.length;
        let newX = Array(n).fill(0);

        if (verbose) console.log("Starting Jacobi method...");
        if (verbose) console.log(`Initial guess: ${x}`);
        if (verbose) console.log(`Matrix A: ${JSON.stringify(A)}`);
        if (verbose) console.log(`Vector b: ${JSON.stringify(b)}`);
        if (verbose) console.log(`Tolerance: ${tolerance}, Max iterations: ${iterations}`);

        for (let iter = 0; iter < iterations; iter++) {
            if (verbose && iter % 10 === 0) console.log(`Iteration ${iter}: Current guess: ${x}`);
            
            for (let i = 0; i < n; i++) {
                let sum = 0;
                for (let j = 0; j < n; j++) if (j !== i) sum += A[i][j] * x[j];
                newX[i] = (b[i] - sum) / A[i][i];
            }
            
            if (newX.every((val, i) => Math.abs(val - x[i]) < tolerance)) {
                if (verbose) console.log(`Convergence reached at iteration ${iter}`);
                return newX;
            }
            x = [...newX];
        }

        if (verbose) console.log("Maximum iterations reached without full convergence.");
        return x;
    }

    static gaussSeidel(A, b, x, iterations, tolerance, verbose = false) {
        let n = x.length;

        if (verbose) console.log("Starting Gauss-Seidel method...");
        if (verbose) console.log(`Initial guess: ${x}`);
        if (verbose) console.log(`Matrix A: ${JSON.stringify(A)}`);
        if (verbose) console.log(`Vector b: ${JSON.stringify(b)}`);
        if (verbose) console.log(`Tolerance: ${tolerance}, Max iterations: ${iterations}`);

        for (let iter = 0; iter < iterations; iter++) {
            if (verbose && iter % 10 === 0) console.log(`Iteration ${iter}: Current guess: ${x}`);
            
            let oldX = [...x];
            for (let i = 0; i < n; i++) {
                let sum = 0;
                for (let j = 0; j < n; j++) if (j !== i) sum += A[i][j] * x[j];
                x[i] = (b[i] - sum) / A[i][i];
            }

            if (x.every((val, i) => Math.abs(val - oldX[i]) < tolerance)) {
                if (verbose) console.log(`Convergence reached at iteration ${iter}`);
                return x;
            }
        }

        if (verbose) console.log("Maximum iterations reached without full convergence.");
        return x;
    }
}
