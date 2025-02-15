export class Stats {
    static mean(arr) {
        return arr.reduce((sum, val) => sum + val, 0) / arr.length;
    }

    static median(arr) {
        arr.sort((a, b) => a - b);
        let mid = Math.floor(arr.length / 2);
        return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
    }

    static variance(arr) {
        let mean = this.mean(arr);
        return this.mean(arr.map(x => (x - mean) ** 2));
    }

    static stddev(arr) {
        return Math.sqrt(this.variance(arr));
    }
}
