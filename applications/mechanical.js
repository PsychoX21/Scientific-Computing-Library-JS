export class FEM {
    static oneDBarElement(stiffnessMatrix, forceVector, displacementVector, numElements) {
        let n = numElements + 1;
        for (let i = 0; i < n; i++) {
            let force = forceVector[i];
            for (let j = 0; j < n; j++) force -= stiffnessMatrix[i][j] * displacementVector[j];
            displacementVector[i] = force / stiffnessMatrix[i][i];
        }
        return displacementVector;
    }
}
