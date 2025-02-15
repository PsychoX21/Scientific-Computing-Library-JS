export class ODESolvers {
    static euler(f, t0, Y0, h, steps, verbose = false) {
        let result = [[t0, ...Y0]];
        let t = t0;
        let vars = Y0;

        if (verbose) console.log(`Euler Method Start: t0 = ${t0}, h = ${h}, steps = ${steps}`);

        for (let i = 0; i < steps; i++) {
            let derivatives = f(t, ...vars);
            if (verbose && i % 100 === 0) {
                console.log(`Step ${i + 1}/${steps}: t = ${t}, vars = ${vars}`);
            }

            for (let j = 0; j < vars.length; j++) {
                vars[j] += h * derivatives[j];
            }
            t += h;
            result.push([t, ...vars]);
        }

        if (verbose) console.log("Euler Method End");
        return result;
    }

    static rk4(f, t0, Y0, h, steps, verbose = false) {
        let result = [[t0, ...Y0]];
        let t = t0;
        let vars = Y0;

        if (verbose) console.log(`RK4 Method Start: t0 = ${t0}, h = ${h}, steps = ${steps}`);

        for (let i = 0; i < steps; i++) {
            let k1 = f(t, ...vars);
            let k2 = f(t + h / 2, ...vars.map((var_, idx) => var_ + h / 2 * k1[idx]));
            let k3 = f(t + h / 2, ...vars.map((var_, idx) => var_ + h / 2 * k2[idx]));
            let k4 = f(t + h, ...vars.map((var_, idx) => var_ + h * k3[idx]));

            if (verbose && i % 100 === 0) {
                console.log(`Step ${i + 1}/${steps}: t = ${t}, k1 = ${k1}, k2 = ${k2}, k3 = ${k3}, k4 = ${k4}`);
            }

            for (let j = 0; j < vars.length; j++) {
                vars[j] += (h / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]);
            }
            t += h;
            result.push([t, ...vars]);
        }

        if (verbose) console.log("RK4 Method End");
        return result;
    }

    static euler2(f, y0, v0, t0, tEnd, h, verbose = false) {
        let t = t0, y = y0, v = v0;
        let results = [[t, y, v]];

        if (verbose) console.log(`Euler2 Method Start: t0 = ${t0}, h = ${h}, tEnd = ${tEnd}`);

        let stepCount = 0;
        while (t < tEnd) {
            let a = f(t, y, v);

            if (verbose && stepCount % 100 === 0) {
                console.log(`Step ${stepCount + 1}: t = ${t}, y = ${y}, v = ${v}, acceleration = ${a}`);
            }

            y += h * v;
            v += h * a;
            t += h;
            results.push([t, y, v]);
            stepCount++;
        }

        if (verbose) console.log("Euler2 Method End");
        return results;
    }

    static rk4_2nd(f, y0, v0, t0, tEnd, h, verbose = false) {
        let t = t0, y = y0, v = v0;
        let results = [[t, y, v]];

        if (verbose) console.log(`RK4_2nd Method Start: t0 = ${t0}, h = ${h}, tEnd = ${tEnd}`);

        let stepCount = 0;
        while (t < tEnd) {
            let k1v = h * f(t, y, v);
            let k1y = h * v;

            let k2v = h * f(t + h / 2, y + k1y / 2, v + k1v / 2);
            let k2y = h * (v + k1v / 2);

            let k3v = h * f(t + h / 2, y + k2y / 2, v + k2v / 2);
            let k3y = h * (v + k2v / 2);

            let k4v = h * f(t + h, y + k3y, v + k3v);
            let k4y = h * (v + k3v);

            if (verbose && stepCount % 100 === 0) {
                console.log(`Step ${stepCount + 1}: t = ${t}, k1v = ${k1v}, k1y = ${k1y}, k2v = ${k2v}, k2y = ${k2y}, k3v = ${k3v}, k3y = ${k3y}, k4v = ${k4v}, k4y = ${k4y}`);
            }

            y += (k1y + 2 * k2y + 2 * k3y + k4y) / 6;
            v += (k1v + 2 * k2v + 2 * k3v + k4v) / 6;
            t += h;
            results.push([t, y, v]);
            stepCount++;
        }

        if (verbose) console.log("RK4_2nd Method End");
        return results;
    }
}
