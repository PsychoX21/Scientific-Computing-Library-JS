class Complex {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    add(c) {
        return new Complex(this.real + c.real, this.imag + c.imag);
    }

    subtract(c) {
        return new Complex(this.real - c.real, this.imag - c.imag);
    }

    multiply(c) {
        return new Complex(
            this.real * c.real - this.imag * c.imag,
            this.real * c.imag + this.imag * c.real
        );
    }

    divide(c) {
        let denom = c.real ** 2 + c.imag ** 2;
        return new Complex(
            (this.real * c.real + this.imag * c.imag) / denom,
            (this.imag * c.real - this.real * c.imag) / denom
        );
    }
}

class FFT {
    static omega(n, k) {
        let angle = (2 * Math.PI * k) / n;
        return new Complex(Math.cos(angle), Math.sin(angle));
    }

    static fft(a) {
        let n = a.length;
        if (n === 1) return a;

        let a0 = a.filter((_, i) => i % 2 === 0);
        let a1 = a.filter((_, i) => i % 2 !== 0);

        let y0 = FFT.fft(a0);
        let y1 = FFT.fft(a1);
        let y = new Array(n);

        for (let k = 0; k < n / 2; k++) {
            let w = FFT.omega(n, k);
            y[k] = y0[k].add(w.multiply(y1[k]));
            y[k + n / 2] = y0[k].subtract(w.multiply(y1[k]));
        }
        return y;
    }

    static ifft(y) {
        let n = y.length;
        let a = FFT.fft(y.map(c => new Complex(c.real, -c.imag)));
        return a.map(c => new Complex(c.real / n, c.imag / n));
    }
}

export { Complex, FFT };
