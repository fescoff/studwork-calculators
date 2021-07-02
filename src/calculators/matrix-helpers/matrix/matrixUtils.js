import Fraction from 'fraction.js';

import { createSquare } from './../utils';

import Matrix from './index';

export class DeterminateError extends Error {
  constructor(msg) {
    super(msg);

    this.name = 'DetermineError';
  }

  static get ZeroMsg() {
    return 'Есть нулевая строка или столбец значит определитель равен нулю';
  }

  static get EqualColsRowsMsg() {
    return 'Есть одинаковые строки или столбцы значит определитель равен нулю';
  }
}

export class InverseMatrixError extends Error {
  constructor(msg) {
    super(msg);

    this.name = 'InverseMatrixError';
  }

  static get NormalUnitMatrix() {
    return 'Матрица приведена к единичной, обратная матрица найдена';
  }
}

export default class MatrixUtils {
  toArrays() {
    return this.m.map(row => row.map(cell => cell.c));
  }

  toJSON() {
    return this.map(cell => cell.c);
  }

  flat() {
    const result = [];

    this.forEach((cell, cellIndex, row, rowIndex) => {
      result.push({
        cellIndex,
        rowIndex,
        cell,
      });
    });

    return result;
  }

  toLatex(
    cb = cell => cell.toLatex(),
    brackets = { left: '\\left(', right: '\\right)' },
    matrixType = 'matrix',
  ) {
    let string = brackets && brackets.left ? brackets.left : '';
    if (this.combined)
      string += `\\begin{array}{${'c'.repeat(this.c)}|${'c'.repeat(
        this.m[0].length - this.c,
      )}}`;
    else string += `\\begin{${matrixType}}`;

    string += this.m
      .map((row, rowIndex) =>
        row.map((cell, cellIndex) => cb(cell, cellIndex, row, rowIndex)).join('&'),
      )
      .join('\\\\');

    if (this.combined) string += '\\end{array}';
    else string += `\\end{${matrixType}}`;
    string += brackets && brackets.right ? brackets.right : '';

    return string;
  }

  map(cb = cell => cell) {
    return this.m.map((row, rowIndex) =>
      row.map((cell, cellIndex) => cb(cell, cellIndex, row, rowIndex)),
    );
  }

  forEach(cb, mode = 'rows') {
    if (mode === 'cols') {
      const result = [];

      this.m.forEach((row, rowIndex) => {
        result.push(this.getColumn(rowIndex));
      });

      return result.forEach((row, rowIndex) =>
        row.forEach((cell, cellIndex) => cb(cell, cellIndex, row, rowIndex)),
      );
    } else {
      return this.m.forEach((row, rowIndex) =>
        row.forEach((cell, cellIndex) => cb(cell, cellIndex, row, rowIndex)),
      );
    }
  }

  equals(anotherMatrix) {
    let result = true;

    this.forEach((cell, cellIndex, row, rowIndex) => {
      if (!cell.equals(anotherMatrix.m[rowIndex][cellIndex])) result = false;
    });

    return result;
  }

  clone() {
    if (this.combined) {
      const newMatr = new Matrix(this.m.map(row => row.map(cell => cell.clone())));
      newMatr.combined = this.combined;
      newMatr.c = this.c;
      newMatr.r = this.r;

      return newMatr;
    } else {
      return new Matrix(this.m.map(row => row.map(cell => cell.clone())));
    }
  }

  // Получение нижней колонки треугольника
  getColumn(index, startRow = 0) {
    const result = [];

    this.m.forEach((row, rowIndex) => {
      if (rowIndex < startRow) return;
      row.forEach((cell, cellIndex) => {
        if (cellIndex === index) result.push(cell);
      });
    });

    return result;
  }

  // Получение верхней колонки треугольника
  getUpColumn(index, endRow = Infinity) {
    const result = [];

    this.m.forEach((row, rowIndex) => {
      if (rowIndex > endRow) return;
      row.forEach((cell, cellIndex) => {
        if (cellIndex === index) result.push(cell);
      });
    });

    return result;
  }

  // Определитель матрицы размер 1х1
  detOne(logger, isRoot) {
    if (this.c !== 1 || this.r !== 1)
      throw new Error(
        `You cannot use determine of 1, for matrix with ${this.c} columns and ${this.r} rows`,
      );

    if (isRoot) {
      logger.addStep({
        text: 'У матрицы 1-го порядка определитель равен единственному элементы',
        nextLine: true,
      });

      logger.addStep({
        text: this.m[0][0].toLatex(),
        nextLine: true,
        big: true,
        isLatex: true,
      });
    }

    return this.m[0][0].c;
  }

  // Определитель матрицы размер 2х2
  detTwo(logger, isRoot) {
    if (this.c !== 2 || this.r !== 2)
      throw new Error(
        `You cannot use determine of 2, for matrix with ${this.c} columns and ${this.r} rows`,
      );
    const mul1 = this.m[0][0].mul(this.m[1][1], false);
    const mul2 = this.m[1][0].mul(this.m[0][1], false);

    const result = mul1.sub(mul2);

    if (isRoot) {
      logger.addStep({
        text: 'Используем формулу для нахождения определителя матрицы 2-го порядка',
        nextLine: true,
      });

      // Fast tex
      const fT = (rowIndex, cellIndex) => this.m[rowIndex][cellIndex].toLatex();

      let latex = `${fT(0, 0)} \\cdot ${fT(1, 1)} - `;
      latex += `${fT(1, 0)} \\cdot ${fT(0, 1)} = ${result.toLatex()}`;

      logger.addStep({
        text: latex,
        isLatex: true,
        nextLine: true,
        big: true,
      });
    }

    return result;
  }

  // Определитель матрицы размер 3х3
  detThree(logger) {
    if (this.c !== 3 || this.r !== 3)
      throw new Error(
        `You cannot use determine of 3, for matrix with ${this.c} columns and ${this.r} rows`,
      );
    const mul1 = this.m[0][0].mul(this.m[1][1].mul(this.m[2][2], false), false);
    const mul2 = this.m[1][0].mul(this.m[2][1].mul(this.m[0][2], false), false);
    const mul3 = this.m[0][1].mul(this.m[1][2].mul(this.m[2][0], false), false);

    const mul4 = this.m[0][2].mul(this.m[1][1].mul(this.m[2][0], false), false);
    const mul5 = this.m[1][0].mul(this.m[0][1].mul(this.m[2][2], false), false);
    const mul6 = this.m[0][0].mul(this.m[2][1].mul(this.m[1][2], false), false);

    const sum1 = mul1.add(mul2.add(mul3));
    const sum2 = mul4.add(mul5.add(mul6));
    const result = sum1.sub(sum2);

    logger.addStep({
      text: 'Умножаем элементы матрицы по формуле',
      nextLine: true,
    });

    // Fast tex
    const fT = (rowIndex, cellIndex) => this.m[rowIndex][cellIndex].toLatex();

    let latex = `${fT(0, 0)} \\cdot ${fT(1, 1)} \\cdot ${fT(2, 2)} + `;
    latex += `${fT(1, 0)} \\cdot ${fT(2, 1)} \\cdot ${fT(0, 2)} + `;
    latex += `${fT(0, 1)} \\cdot ${fT(1, 2)} \\cdot ${fT(2, 0)} - `;

    latex += `${fT(0, 2)} \\cdot ${fT(1, 1)} \\cdot ${fT(2, 0)} + `;
    latex += `${fT(1, 0)} \\cdot ${fT(0, 1)} \\cdot ${fT(2, 2)} + `;
    latex += `${fT(0, 0)} \\cdot ${fT(2, 1)} \\cdot ${fT(1, 2)} = `;

    latex += result.toLatex();

    logger.addStep({
      text: latex,
      nextLine: true,
      isLatex: true,
      big: true,
    });

    logger.end(result);

    return result;
  }

  // Сложение строк
  addRow(rowIndex1, rowIndex2, logger, multiplier = 1, needCheck = true) {
    const isCustomMultiplier = multiplier !== 1;

    if (isCustomMultiplier) {
      logger.addStep({
        text: `Складываем ${rowIndex1 + 1} строку и ${rowIndex2 + 1} умноженную на `,
        nextLine: true,
      });

      logger.addStep({
        text: multiplier.toLatex(),
        isLatex: true,
      });
    } else {
      logger.addStep({
        text: `Складываем ${rowIndex1 + 1} строку и ${rowIndex2 + 1}`,
        nextLine: true,
      });
    }

    const row1 = this.m[rowIndex1];
    const row2 = this.m[rowIndex2];

    let latex = this.toLatex((cell, cellIndex, row, rowIndex) => {
      if (rowIndex !== rowIndex1) return cell.toLatex();
      else if (isCustomMultiplier) {
        let resultString = `${cell.toLatex()} + `;
        resultString += `(${row2[cellIndex].toLatex()} \\cdot ${multiplier.toLatex()})`;

        return resultString;
      } else return `${cell.toLatex()} + ${row2[cellIndex].toLatex()}`;
    });

    if (isCustomMultiplier) {
      row1.forEach((cell, cellIndex) => {
        const mul = row2[cellIndex].mul(multiplier, false);
        cell.add(mul);
      });
    } else {
      row1.forEach((cell, cellIndex) => {
        cell.add(row2[cellIndex]);
      });
    }

    latex += ` = ${this.toLatex()}`;

    logger.addStep({
      text: latex,
      isLatex: true,
      nextLine: true,
      big: true,
    });

    if (needCheck) this.checkDet();
  }

  // Вычитание строк
  subRow(rowIndex1, rowIndex2, logger, multiplier = 1, needCheck = true) {
    const isCustomMultiplier = multiplier !== 1;

    if (isCustomMultiplier) {
      logger.addStep({
        text: `Вычитаем из ${rowIndex1 + 1} строки ${rowIndex2 + 1} умноженную на `,
        nextLine: true,
      });

      logger.addStep({
        text: multiplier.toLatex(),
        isLatex: true,
      });
    } else {
      logger.addStep({
        text: `Вычитаем из ${rowIndex1 + 1} строки ${rowIndex2 + 1}`,
        nextLine: true,
      });
    }

    const row1 = this.m[rowIndex1];
    const row2 = this.m[rowIndex2];

    let latex = this.toLatex((cell, cellIndex, row, rowIndex) => {
      if (rowIndex !== rowIndex1) return cell.toLatex();
      else if (isCustomMultiplier) {
        let resultString = `${cell.toLatex()} - `;
        resultString += `(${row2[cellIndex].toLatex()} \\cdot ${multiplier.toLatex()})`;

        return resultString;
      } else return `${cell.toLatex()} - ${row2[cellIndex].toLatex()}`;
    });

    if (isCustomMultiplier) {
      row1.forEach((cell, cellIndex) => {
        const mul = row2[cellIndex].mul(multiplier, false);
        cell.sub(mul);
      });
    } else {
      row1.forEach((cell, cellIndex) => {
        cell.sub(row2[cellIndex]);
      });
    }

    latex += ` = ${this.toLatex()}`;

    logger.addStep({
      text: latex,
      isLatex: true,
      nextLine: true,
      big: true,
    });

    if (needCheck) this.checkDet();
  }

  // Умножение строк
  mulRow(rowIndex, number, logger, actions, needCheck = true) {
    logger.addStep({
      text: `Умножаем ${rowIndex + 1} строку на `,
      nextLine: true,
    });

    logger.addStep({
      text: number.toLatex(),
      isLatex: true,
    });

    if (actions)
      actions.push({
        value: number,
        action: 'mul',
      });

    const row = this.m[rowIndex];

    let latex = this.toLatex((cell, cellIndex, row, rowIndexLocal) => {
      if (rowIndexLocal !== rowIndex) return cell.toLatex();
      else return `${cell.toLatex()} \\cdot ${number.toLatex()}`;
    });

    row.forEach((cell, cellIndex) => {
      cell.mul(number);
    });

    latex += ` = ${this.toLatex()}`;

    logger.addStep({
      text: latex,
      isLatex: true,
      nextLine: true,
      big: true,
    });

    if (needCheck) this.checkDet();
  }

  // Деление строк
  divRow(rowIndex, number, logger, actions, needCheck = true) {
    logger.addStep({
      text: `Делим ${rowIndex + 1} строку на `,
      nextLine: true,
    });

    logger.addStep({
      text: number.toLatex(),
      isLatex: true,
    });

    if (actions)
      actions.push({
        value: number,
        action: 'div',
      });

    const row = this.m[rowIndex];

    let latex = this.toLatex((cell, cellIndex, row, rowIndexLocal) => {
      if (rowIndexLocal !== rowIndex) return cell.toLatex();
      else return `${cell.toLatex()} / ${number.toLatex()}`;
    });

    row.forEach((cell, cellIndex) => {
      cell.div(number);
    });

    latex += ` = ${this.toLatex()}`;

    logger.addStep({
      text: latex,
      isLatex: true,
      nextLine: true,
      big: true,
    });

    if (needCheck) this.checkDet();
  }

  // Нахождение строки элемент которой не равен нулю
  // проходя вдоль конкретного столбца сверху вниз
  findNotZeroRowIndex(startRow = 0, cellIndex = 0) {
    for (let i = startRow; i < this.m.length; i++) {
      if (!this.m[i][cellIndex].equals(0)) return i;
    }
    return -1;
  }

  // Аналог предыдущего, но снизу вверх
  findNotZeroRowUpIndex(endRow = this.m.length, cellIndex = 0) {
    for (let i = 0; i < endRow; i++) {
      if (!this.m[i][cellIndex].equals(0)) return i;
    }
    return -1;
  }

  // Проверка на то, что колонка целиком нулевая
  checkColumnOnFullZero(index) {
    const col = this.getColumn(index);

    return col.every(elem => elem.equals(0));
  }

  // Аналог для строк
  checkRowOnFullZero(index) {
    const row = this.m[index];

    return row.every(elem => elem.equals(0));
  }

  // Проверка не равен ли определитель нулю
  checkDet(logger) {
    const rows = this.m;
    const cols = [];

    for (let i = 0; i < this.c; i++) {
      const col = this.getColumn(i);
      cols.push(col);
    }

    const checkOnZero = [...rows, ...cols].some(colOrRow =>
      colOrRow.every(elem => elem.equals(0)),
    );

    if (checkOnZero) {
      throw new DeterminateError(DeterminateError.ZeroMsg);
    }

    const checkEqualArrs = (arr1, arr2) => {
      let result = true;

      arr1.forEach((elem, index) => {
        if (!elem.equals(arr2[index])) result = false;
      });

      return result;
    };

    const checkDoubleArr = arr => {
      let result = false;

      for (let i = 1; i < arr.length; i++) {
        if (checkEqualArrs(arr[i - 1], arr[i])) result = true;
      }

      return result;
    };

    const checkOnEquals = checkDoubleArr(rows) || checkDoubleArr(cols);

    if (checkOnEquals) {
      throw new DeterminateError(DeterminateError.EqualColsRowsMsg);
    }

    return true;
  }

  undoDetActions(det, actions, logger) {
    let result = det;

    logger.addStep({
      text: 'Произведем обратные операции, операциям преобразования матрицы',
      nextLine: true,
    });

    let latex = det.toLatex();

    actions.forEach(({ value, action }) => {
      switch (action) {
        case 'div':
          result = result.mul(value);
          latex += ` \\cdot ${value.toLatex()}`;
          break;
        case 'mul':
          result = result.div(value);
          latex += ` / ${value.toLatex()}`;
          break;
      }
    });

    latex += ` = ${result.toLatex()}`;

    logger.addStep({
      text: latex,
      isLatex: true,
      big: true,
      nextLine: true,
    });

    return result;
  }

  // Создание минора матрицы
  createMinor(rowIndex, cellIndex) {
    const rawMatrix = [];

    this.m.forEach((row, rowIndexLocal) => {
      if (rowIndex === rowIndexLocal) return;
      const newArr = [];
      rawMatrix.push(newArr);
      row.forEach((cell, cellIndexLocal) => {
        if (cellIndexLocal === cellIndex) return;
        newArr.push(cell.c);
      });
    });

    return new Matrix(rawMatrix);
  }

  // Рекурсивное нахождение определителя через разложение
  detByElems(logger, isRoot = false) {
    if (this.c === 1) {
      return this.detOne(logger, isRoot);
    } else if (this.c === 2) {
      return this.detTwo(logger, isRoot);
    } else {
      let result = new Fraction(0);

      if (isRoot) {
        logger.addStep({
          text: 'Используем разложение по первой строке',
          nextLine: true,
        });
      }

      const sumElems = [];

      this.m[0].forEach((cell, cellIndex) => {
        const needChangeSign = cellIndex % 2;
        const minor = this.createMinor(0, cellIndex);

        let dopDet = minor.detByElems(logger);

        if (needChangeSign) dopDet = dopDet.neg();

        const fullDet = cell.mul(dopDet, false);

        if (isRoot) {
          const rightMinorDet = needChangeSign ? dopDet.neg() : dopDet;

          logger.addStep({
            text: `${minor.toLatex(
              undefined,
              null,
              'vmatrix',
            )} = ${rightMinorDet.toLatex()}`,
            isLatex: true,
            big: true,
            nextLine: true,
          });

          if (needChangeSign) {
            const latexSum = `(-1 \\cdot ${rightMinorDet.toLatex()} \\cdot ${cell.toLatex()})`;

            sumElems.push(latexSum);
          } else {
            sumElems.push(`(${rightMinorDet.toLatex()} \\cdot ${cell.toLatex()})`);
          }
        }

        result = result.add(fullDet);
      });

      if (isRoot) {
        logger.addStep({
          text: `${sumElems.join(' + ')} = ${result.toLatex()}`,
          isLatex: true,
          big: true,
          nextLine: true,
        });
      }

      return result;
    }
  }

  // Получение матрицы алгебраических дополнений
  getMatrixAlgAddition() {
    const newMatr = this.clone();

    newMatr.forEach((cell, cellIndex, row, rowIndex) => {
      const needChangeSign = (cellIndex + rowIndex) % 2;

      const minor = this.createMinor(rowIndex, cellIndex);
      let det = minor.detByElems(null);

      if (needChangeSign) det = det.neg();

      cell.c = det;
    });

    return newMatr;
  }

  // Получение единичной матрицы из текущей
  getUnitMatrix() {
    const rawMatrix = createSquare(this.c, 0);

    rawMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (rowIndex === cellIndex) row[cellIndex] = 1;
      });
    });

    return new Matrix(rawMatrix);
  }

  // Проверка не является ли матрица единичной
  checkForUnitMatrix() {
    let result = true;

    this.forEach((cell, cellIndex, row, rowIndex) => {
      if (cellIndex === rowIndex) {
        if (!cell.equals(1)) result = false;
      } else if (!cell.equals(0)) result = false;
    });

    if (result) throw new InverseMatrixError(InverseMatrixError.NormalUnitMatrix);
  }
}
