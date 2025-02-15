import { FFT, Complex } from "../fft/fft.js";

export class FFTApplications {
    static lowPassFilter(signal, cutoffFrequency) {
        let N = signal.length;
        let freqData = FFT.fft(signal.map(x => new Complex(x, 0)));

        let filteredData = freqData.map((c, i) => {
            let frequency = i / N;
            return frequency > cutoffFrequency ? new Complex(0, 0) : c;
        });

        return FFT.ifft(filteredData).map(c => c.real);
    }

    static powerSpectrum(signal) {
        let N = signal.length;
        let freqData = FFT.fft(signal.map(x => new Complex(x, 0)));

        return freqData.map(c => (c.real ** 2 + c.imag ** 2) / N);
    }
}
