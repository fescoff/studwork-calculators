import { createSquare, createRectangle } from './../utils';
import { getCell } from './../matrixCell';

import MatrixUtils from './matrixUtils';

import mul from './mul';
import sum from './sum';
import sub from './sub';
import transpose from './transpose';
import pow from './pow';
import det from './det';
import rank from './rank';
import inverse from './inverse';

class Matrix extends MatrixUtils {
  m; // Matrix
  r; // Count of rows
  c; // Count of cols
  combined; // If matrix now combined

  constructor(arrOrNum, num2) {
    super();
    this.combined = false;
    let arr;

    if (typeof arrOrNum === 'number' && !num2) {
      this.r = arrOrNum;
      this.c = arrOrNum;
      arr = createSquare(arrOrNum);
    } else if (typeof arrOrNum === 'number' && typeof num2 === 'number') {
      this.r = arrOrNum;
      this.c = num2;
      arr = createRectangle(arrOrNum, num2);
    } else if (Array.isArray(arrOrNum)) {
      if (arrOrNum.length > 0) {
        this.r = arrOrNum.length;
        this.c = arrOrNum[0].length;
      } else {
        this.r = 0;
        this.c = 0;
      }
      arr = arrOrNum;
    } else throw new Error('Bad arg types');

    this.m = arr.map(row => row.map(cell => getCell(cell)));
  }
}

Matrix.prototype.mul = mul;
Matrix.prototype.sum = sum;
Matrix.prototype.sub = sub;
Matrix.prototype.transpose = transpose;
Matrix.prototype.pow = pow;
Matrix.prototype.det = det;
Matrix.prototype.rank = rank;
Matrix.prototype.inverse = inverse;

export default Matrix;
