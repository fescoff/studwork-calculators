import Fraction from 'fraction.js';

import MatrixLogger from './../logger';
import { DeterminateError } from './matrixUtils';

export default function(way = 'gauss') {
  const logger = new MatrixLogger();

  const matrix = this.clone();

  try {
    this.checkDet(logger);

    if (way === 'gauss') {
      const changeDetActions = [];

      matrix.m.forEach((row, rowIndex) => {
        const column = matrix.getColumn(rowIndex, rowIndex);
        // Проверка если колонка состоит из 1 элемента то ничего делать не нужно
        // Состоять из одного элемента она может только если это последний элемент
        if (column.length === 1) return;

        column.forEach((cell, colIndex) => {
          const fullRowIndex = colIndex + rowIndex;

          // Приводим первые элементы колонок к единице
          if (colIndex === 0) {
            const firstColumn = cell;

            // Проверка равен ли первый элемент колонки нулю
            if (firstColumn.equals(0)) {
              const notZeroRowIndex = matrix.findNotZeroRowIndex(rowIndex, rowIndex);
              if (notZeroRowIndex !== -1) {
                matrix.addRow(rowIndex, notZeroRowIndex, logger);
              } else {
                return;
              }
            }

            if (!firstColumn.equals(1)) {
              matrix.divRow(rowIndex, cell.c, logger, changeDetActions);
            }
            // Если значение ячейки уже 0, то ничего не делаем
          } else if (cell.equals(0)) return;
          // Вычитаем из текущей строки первую строку колонки умноженную на значение ячейки
          else {
            matrix.subRow(fullRowIndex, rowIndex, logger, cell.c);
          }
        });
      });

      let rawDet = new Fraction(1);

      logger.addStep({
        text: 'Перемножаем числа на главной диагонали',
        nextLine: true,
      });

      const diagonal = [];

      matrix.m.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (rowIndex === cellIndex) {
            diagonal.push(cell.c);
          }
        });
      });

      const diagonalTex = diagonal.map(elem => elem.toLatex());

      diagonal.forEach((number, index) => {
        rawDet = rawDet.mul(number);
      });

      logger.addStep({
        text: `${diagonalTex.join('\\cdot')} = ${rawDet.toLatex()}`,
        isLatex: true,
        nextLine: true,
        big: true,
      });

      const det = this.undoDetActions(rawDet, changeDetActions, logger);

      logger.end(det, matrix);

      return logger;
    } else if (way === 'triangle') {
      this.detThree(logger);

      return logger;
    } else if (way === 'elements') {
      const result = this.detByElems(logger, true);

      logger.end(result);

      return logger;
    } else throw new Error(`Bad way argument ${way}`);
  } catch (err) {
    if (err instanceof DeterminateError) {
      logger.addStep({
        text: err.message,
        nextLine: true,
      });

      logger.addStep({
        text: matrix.toLatex(),
        nextLine: true,
        big: true,
        isLatex: true,
      });

      logger.end(new Fraction(0));

      return logger;
    } else {
      throw err;
    }
  }
}
