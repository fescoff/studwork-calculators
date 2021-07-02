import Fraction from 'fraction.js';

import { DeterminateError, InverseMatrixError } from './matrixUtils';
import MatrixLogger, { FakeLogger } from './../logger';

export default function(way = 'default') {
  const logger = new MatrixLogger();

  if (way === 'alg-add') {
    logger.addStep({
      text: 'Находим определитель матрицы',
      nextLine: true,
    });

    const matrixForDet = this.clone();

    const det = matrixForDet.detByElems(null);

    if (det.equals(0)) {
      logger.addStep({
        text: 'Определитель матрицы равен 0',
        nextLine: true,
      });

      logger.addStep({
        text: 'Обратной матрицы не существует т.к. определитель равен 0',
        nextLine: true,
      });

      logger.end();

      return logger;
    }

    logger.addStep({
      text: det.toLatex(),
      nextLine: true,
      isLatex: true,
    });

    const matrAlgAddition = this.getMatrixAlgAddition();

    logger.addStep({
      text: 'Находим матрицу алгебраических дополнений',
      nextLine: true,
    });

    logger.addStep({
      text: matrAlgAddition.toLatex(),
      nextLine: true,
      isLatex: true,
      big: true,
    });

    matrAlgAddition.transpose();

    logger.addStep({
      text: 'Транспонируем матрицу алгебраических дополнений',
      nextLine: true,
    });

    const transposedMatrAlgAddition = matrAlgAddition;

    logger.addStep({
      text: transposedMatrAlgAddition.toLatex(),
      isLatex: true,
      big: true,
      nextLine: true,
    });

    logger.addStep({
      text: `Следуя формуле`,
      nextLine: true,
    });

    logger.addStep({
      text: `\\frac{1}{${det.toLatex()}} \\cdot ${transposedMatrAlgAddition.toLatex()}`,
      isLatex: true,
      big: true,
      nextLine: true,
    });

    transposedMatrAlgAddition.mul(new Fraction(1).div(det));

    const inversedMatrix = transposedMatrAlgAddition;

    logger.end(inversedMatrix);
  } else if (way === 'default') {
    const matrix = this.clone();
    const matrixCopy = this.clone();

    try {
      const fakeLogger = new FakeLogger();

      matrixCopy.checkDet();
      matrixCopy.checkForUnitMatrix();

      const unitMatrix = matrix.getUnitMatrix();
      // Совмещаем две матрицы
      matrix.m.forEach((row, rowIndex) => {
        matrix.m[rowIndex] = [...row, ...unitMatrix.m[rowIndex]];
      });

      matrix.combined = true;

      logger.addStep({
        text: 'Дописываем единичную матрицу',
        nextLine: true,
      });

      logger.addStep({
        text: matrix.toLatex(),
        isLatex: true,
        big: true,
        nextLine: true,
      });

      matrixCopy.m.forEach((row, rowIndex) => {
        const column = matrixCopy.getColumn(rowIndex, rowIndex);

        // Для прохода по нижнему треугольнику элементов
        const columnHandler = (cell, colIndex) => {
          const fullRowIndex = colIndex + rowIndex;
          const isDiagonal = colIndex === 0;

          if (isDiagonal) {
            if (cell.equals(0)) {
              const notZeroRowIndex = matrixCopy.findNotZeroRowIndex(rowIndex, rowIndex);
              if (notZeroRowIndex !== -1) {
                matrix.addRow(rowIndex, notZeroRowIndex, logger, 1, false);
                matrixCopy.addRow(rowIndex, notZeroRowIndex, fakeLogger);
                matrixCopy.checkForUnitMatrix();
              } else {
                return;
              }
            }

            if (!cell.equals(1)) {
              matrix.divRow(rowIndex, cell.c, logger);
              matrixCopy.divRow(rowIndex, cell.c, fakeLogger);
              matrixCopy.checkForUnitMatrix();
            }
          } else if (cell.equals(0)) return;
          else {
            matrix.subRow(fullRowIndex, rowIndex, logger, cell.c, false);
            matrixCopy.subRow(fullRowIndex, rowIndex, fakeLogger, cell.c);
            matrixCopy.checkForUnitMatrix();
          }
        };

        // Для прохода по верхнему треугольнику элементов
        const columnUpHandler = (cell, colIndex, upColumn) => {
          const fullRowIndex = rowIndex - (upColumn.length - 1) + colIndex;
          const isDiagonal = fullRowIndex === rowIndex;

          if (isDiagonal) {
            if (cell.equals(0)) {
              const notZeroRowIndex = matrixCopy.findNotZeroRowUpIndex(
                rowIndex,
                rowIndex,
              );
              if (notZeroRowIndex !== -1) {
                matrix.addRow(rowIndex, notZeroRowIndex, logger, 1, false);
                matrixCopy.addRow(rowIndex, notZeroRowIndex, fakeLogger);
                matrixCopy.checkForUnitMatrix();
              } else {
                return;
              }
            }

            if (!cell.equals(1)) {
              matrix.divRow(fullRowIndex, cell.c, logger);
              matrixCopy.divRow(fullRowIndex, cell.c, fakeLogger);
              matrixCopy.checkForUnitMatrix();
            }
          } else if (cell.equals(0)) return;
          else {
            matrix.subRow(fullRowIndex, rowIndex, logger, cell.c, false);
            matrixCopy.subRow(fullRowIndex, rowIndex, fakeLogger, cell.c);
            matrixCopy.checkForUnitMatrix();
          }
        };

        column.forEach(columnHandler);

        const upColumn = matrixCopy.getUpColumn(rowIndex, rowIndex);

        upColumn.forEach(columnUpHandler);
      });
    } catch (err) {
      if (err instanceof DeterminateError) {
        logger.addStep({
          text: err.message,
          nextLine: true,
        });

        logger.addStep({
          text: matrixCopy.toLatex(),
          nextLine: true,
          big: true,
          isLatex: true,
        });

        logger.addStep({
          text: 'Обратной матрицы не существует т.к. определитель равен 0',
          nextLine: true,
        });

        logger.end();

        return logger;
      } else if (err instanceof InverseMatrixError) {
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

        // Получаем из сдвоенной матрицы обычную
        matrix.m = matrix.m.map((row, rowIndex) => {
          const arr = [];

          row.forEach((cell, cellIndex) => {
            if (cellIndex > matrix.c - 1) arr.push(cell);
          });

          return arr;
        });

        matrix.combined = false;

        logger.end(matrix);

        return logger;
      } else {
        throw err;
      }
    }
  }

  return logger;
}
