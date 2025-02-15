export class MatrixOps {
    static multiply(A, B) {
        let rowsA = A.length, colsA = A[0].length;
        let rowsB = B.length, colsB = B[0].length;
        if (colsA !== rowsB) throw new Error("Matrix dimensions do not match");

        let result = Array(rowsA).fill().map(() => Array(colsB).fill(0));
        for (let i = 0; i < rowsA; i++) {
            for (let j = 0; j < colsB; j++) {
                for (let k = 0; k < colsA; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return result;
    }

    static transpose(A) {
        return A[0].map((_, colIndex) => A.map(row => row[colIndex]));
    }

    static determinant(A) {
        if (A.length !== A[0].length) throw new Error("Matrix must be square");
        let n = A.length;

        if (n === 1) return A[0][0];
        if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];

        let det = 0;
        for (let i = 0; i < n; i++) {
            let subMatrix = A.slice(1).map(row => row.filter((_, colIndex) => colIndex !== i));
            det += ((i % 2 === 0 ? 1 : -1) * A[0][i] * this.determinant(subMatrix));
        }
        return det;
    }

    static inverse(A) {
        let n = A.length;
        let I = A.map((row, i) => row.map((_, j) => (i === j ? 1 : 0)));
        let M = A.map(row => [...row]);

        for (let i = 0; i < n; i++) {
            let pivot = M[i][i];
            if (pivot === 0) throw new Error("Matrix is singular and cannot be inverted");

            for (let j = 0; j < n; j++) {
                M[i][j] /= pivot;
                I[i][j] /= pivot;
            }

            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    let factor = M[k][i];
                    for (let j = 0; j < n; j++) {
                        M[k][j] -= factor * M[i][j];
                        I[k][j] -= factor * I[i][j];
                    }
                }
            }
        }
        return I;
    }
}
