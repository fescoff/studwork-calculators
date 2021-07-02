import { getCell } from './../matrixCell';
import MatrixLogger from './../logger';

export default function(exponent) {
  const logger = new MatrixLogger();

  logger.addStep({ text: `Возводим матрицу в степень` });
  let latex = `\\mathbf{C} = ${this.toLatex()}^${exponent} = `;

  if (exponent > 1) {
    const resultMatrix = this.clone();

    for (let i = 1; i < exponent; i++) {
      resultMatrix.m = resultMatrix.map((cell, cellIndex, row, rowIndex) => {
        return this.m[rowIndex].reduce((acc, cell1, cellIndex1) => {
          acc.add(cell1.mul(resultMatrix.m[cellIndex1][cellIndex], false));
          return acc;
        }, getCell(0));
      });
    }

    this.m = resultMatrix.m;
  }

  latex += this.toLatex();

  logger.addStep({
    text: latex,
    isLatex: true,
    nextLine: true,
    big: true,
  });

  logger.end();

  return logger;
}
