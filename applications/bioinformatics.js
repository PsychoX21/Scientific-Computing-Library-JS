export class Bioinformatics {
    static needlemanWunsch(seq1, seq2, match = 1, mismatch = -1, gap = -2) {
        let m = seq1.length, n = seq2.length;
        let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) dp[i][0] = i * gap;
        for (let j = 0; j <= n; j++) dp[0][j] = j * gap;

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                let matchScore = seq1[i - 1] === seq2[j - 1] ? match : mismatch;
                dp[i][j] = Math.max(
                    dp[i - 1][j - 1] + matchScore,
                    dp[i - 1][j] + gap,
                    dp[i][j - 1] + gap
                );
            }
        }
        return dp[m][n];
    }
}
