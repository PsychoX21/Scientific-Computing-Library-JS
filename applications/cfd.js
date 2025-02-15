export class CFD {
    static navierStokes2D(grid, dt, viscosity, iterations, verbose = false) {
        let n = grid.length, m = grid[0].length;
        let velocity = Array.from({ length: n }, () => Array.from({ length: m }, () => [0, 0]));

        if (verbose) {
            console.log(`Starting 2D Navier-Stokes simulation...`);
            console.log(`Grid size: ${n}x${m}`);
            console.log(`Time step (dt): ${dt}`);
            console.log(`Viscosity: ${viscosity}`);
            console.log(`Iterations: ${iterations}`);
        }

        for (let iter = 0; iter < iterations; iter++) {
            let newVelocity = velocity.map(row => row.map(v => [...v]));

            for (let i = 1; i < n - 1; i++) {
                for (let j = 1; j < m - 1; j++) {
                    let [u, v] = velocity[i][j];

                    let laplacianU = velocity[i - 1][j][0] + velocity[i + 1][j][0] + velocity[i][j - 1][0] + velocity[i][j + 1][0] - 4 * u;
                    let laplacianV = velocity[i - 1][j][1] + velocity[i + 1][j][1] + velocity[i][j - 1][1] + velocity[i][j + 1][1] - 4 * v;

                    newVelocity[i][j] = [
                        u + dt * viscosity * laplacianU,
                        v + dt * viscosity * laplacianV
                    ];
                }
            }

            velocity = newVelocity;

            if (verbose && iter % (iterations / 10) === 0) {
                console.log(`Iteration ${iter + 1}/${iterations}`);
            }
        }

        if (verbose) {
            console.log(`Simulation completed after ${iterations} iterations.`);
        }

        return velocity;
    }
}
