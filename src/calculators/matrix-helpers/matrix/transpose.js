import MatrixLogger from './../logger';

import Matrix from './index';

export default function(log = true) {
  let logger, latex;

  if (log) {
    logger = new MatrixLogger();

    logger.addStep({ text: `Транспонируем матрицу` });

    latex = `\\mathbf{C}^T = ${this.toLatex()}^T`;
  }

  const newMatrix = new Matrix(this.c, this.r);

  newMatrix.m = newMatrix.map(
    (cell, cellIndex, row, rowIndex) => this.m[cellIndex][rowIndex],
  );

  this.m = newMatrix.m;
  this.c = newMatrix.c;
  this.r = newMatrix.r;

  if (log) {
    latex += ` = ${this.toLatex()}`;

    logger.addStep({
      text: latex,
      isLatex: true,
      big: true,
      nextLine: true,
    });
    logger.end();
  }

  return logger;
}
