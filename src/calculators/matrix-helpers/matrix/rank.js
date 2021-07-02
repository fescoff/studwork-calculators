import Fraction from 'fraction.js';

import MatrixLogger from './../logger';

export default function() {
  const logger = new MatrixLogger();

  const matrix = this.clone();

  const countIterations = this.c > this.r ? this.r : this.c;

  for (let i = 0, rowIndex = 0; i < countIterations; i++) {
    if (this.checkColumnOnFullZero(i)) continue;
    const column = matrix.getColumn(i, rowIndex);

    column.forEach((cell, colIndex) => {
      const fullRowIndex = colIndex + rowIndex;

      // Приводим первые элементы колонок к единице
      if (colIndex === 0) {
        const firstColumn = cell;

        // Проверка равен ли первый элемент колонки нулю
        if (firstColumn.equals(0)) {
          const notZeroRowIndex = matrix.findNotZeroRowIndex(rowIndex, i);
          if (notZeroRowIndex !== -1) {
            matrix.addRow(rowIndex, notZeroRowIndex, logger, 1, false);
          } else {
            return;
          }
        }

        if (!firstColumn.equals(1)) {
          matrix.divRow(rowIndex, cell.c, logger, null, false);
        }
        // Если значение ячейки уже 0, то ничего не делаем
      } else if (cell.equals(0)) return;
      // Вычитаем из текущей строки первую строку колонки умноженную на значение ячейки
      else {
        matrix.subRow(fullRowIndex, rowIndex, logger, cell.c, false);
      }
    });

    rowIndex++;
  }

  const notZeroRows = matrix.m.filter((row, rowIndex) =>
    row.some(elem => !elem.equals(0)),
  );

  logger.addStep({
    text: matrix.toLatex(),
    isLatex: true,
    nextLine: true,
    big: true,
  });

  logger.addStep({
    text: `Количество ненулевых строк ${notZeroRows.length}`,
    nextLine: true,
  });

  logger.end(new Fraction(notZeroRows.length));

  return logger;
}
