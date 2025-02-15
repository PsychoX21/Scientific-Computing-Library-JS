import { ODESolvers } from "../numerical/ode_solvers.js";

export class ODEApplications {
    static lorenzAttractor(sigma, rho, beta, x0 = 1, y0 = 1, z0 = 1, h = 0.01, steps = 5000, verbose = false) {
        const f = (t, Y) => {
            let [x, y, z] = Y;
            return [
                sigma * (y - x),
                x * (rho - z) - y,
                x * y - beta * z
            ];
        };

        let result = ODESolvers.rk4(f, 0, [x0, y0, z0], h, steps, verbose);
        return result;
    }

    static simplePendulum(theta0, length, g = 9.81, h = 0.01, steps = 1000, verbose = false) {
        const f = (t, Y) => {
            let [theta, omega] = Y;
            return [omega, - (g / length) * Math.sin(theta)];
        };

        let result = ODESolvers.rk4(f, 0, [theta0, 0], h, steps, verbose);
        return result;
    }

    static projectileMotion(v0, theta, k = 0, g = 9.81, h = 0.01, steps = 1000, verbose = false) {
        let thetaRad = theta * Math.PI / 180;
        let vx0 = v0 * Math.cos(thetaRad);
        let vy0 = v0 * Math.sin(thetaRad);
        let x0 = 0, y0 = 0;

        const f_x = (t, x, vx) => {
            return [-k * vx];
        };

        const f_y = (t, y, vy) => {
            return [-g - k * vy];
        };

        let xResult = ODESolvers.rk4_2nd(f_x, x0, vx0, 0, steps * h, h, verbose);

        let yResult = ODESolvers.rk4_2nd(f_y, y0, vy0, 0, steps * h, h, verbose);

        let result = [];
        for (let i = 0; i < steps; i++) {
            result.push([xResult[i][0], yResult[i][0]]);
        }

        return result;
    }
}
