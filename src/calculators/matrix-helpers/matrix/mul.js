import Fraction from 'fraction.js';

import MatrixLogger from './../logger';
import { getCell } from './../matrixCell';

import Matrix from './index.js';

export default function(numberOrMatrix) {
  if (
    typeof numberOrMatrix === 'number' ||
    typeof numberOrMatrix === 'string' ||
    numberOrMatrix instanceof Fraction
  ) {
    const logger = new MatrixLogger();

    const matrCell = getCell(numberOrMatrix);

    logger.addStep({ text: `Умножаем матрицу на число ` });
    logger.addStep({ text: matrCell.toLatex(), isLatex: true });

    let latex = `\\mathbf{C} = ${this.toLatex()} \\cdot ${matrCell.toLatex()} = `;

    latex += this.toLatex(
      (cell, cellIndex) => `${cell.toLatex()} \\cdot ${matrCell.toLatex()}`,
    );

    this.forEach(cell => cell.mul(matrCell));

    latex += ` = ${this.toLatex()}`;

    logger.addStep({
      text: latex,
      isLatex: true,
      big: true,
      nextLine: true,
    });
    logger.end();

    return logger;
  } else if (numberOrMatrix instanceof Matrix) {
    const logger = new MatrixLogger();
    const matrix = numberOrMatrix;

    const resultMatrix = new Matrix(this.r, matrix.c);

    logger.addStep({ text: `Умножаем матрицу на другую матрицу` });

    let latex = `\\mathbf{C} = ${this.toLatex()} \\cdot ${matrix.toLatex()} = `;

    latex += resultMatrix.toLatex((cell, cellIndex, row, rowIndex) => {
      return this.m[rowIndex]
        .map(
          (cell1, cellIndex1) =>
            `${cell1.toLatex()} \\cdot ${matrix.m[cellIndex1][cellIndex].toLatex()}`,
        )
        .join(' + ');
    });

    this.m = resultMatrix.map((cell, cellIndex, row, rowIndex) => {
      return this.m[rowIndex].reduce((acc, cell1, cellIndex1) => {
        acc.add(cell1.mul(matrix.m[cellIndex1][cellIndex], false));
        return acc;
      }, getCell(0));
    });

    this.r = resultMatrix.r;
    this.c = resultMatrix.c;

    latex += ` = ${this.toLatex()}`;

    logger.addStep({
      text: latex,
      isLatex: true,
      nextLine: true,
      big: true,
    });

    logger.end();

    return logger;
  } else throw new Error('Bad arg types');
}
