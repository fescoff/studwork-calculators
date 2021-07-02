import MatrixLogger from './../logger';

export default function(matrix) {
  const logger = new MatrixLogger();

  logger.addStep({ text: `Складываем матрицы` });

  let latex = `\\mathbf{C} = ${this.toLatex()} + ${matrix.toLatex()} = `;

  latex += this.toLatex(
    (cell, cellIndex, row, rowIndex) =>
      `${cell.toLatex()} + ${matrix.m[rowIndex][cellIndex].toLatex()}`,
  );

  this.forEach((cell, cellIndex, row, rowIndex) =>
    cell.add(matrix.m[rowIndex][cellIndex]),
  );

  latex += ` = ${this.toLatex()}`;

  logger.addStep({
    text: latex,
    isLatex: true,
    big: true,
    nextLine: true,
  });
  logger.end();

  return logger;
}
