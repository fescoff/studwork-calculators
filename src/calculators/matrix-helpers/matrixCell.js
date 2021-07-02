import Fraction from 'fraction.js';

import { getReduceFraction, getSignFixedFraction } from '../fractionUtils';

export class IMatrixCell {
  c;

  constructor(v) {
    this.c = v;
  }

  clone() {}

  toLatex() {}

  toString() {}

  add() {}

  sub() {}

  mul() {}

  div() {}
}

export class MatrixCell extends IMatrixCell {
  c;

  constructor(cell) {
    super();

    this.c = getReduceFraction(cell, false);
  }

  clone() {
    return this.c.clone();
  }

  copy() {
    return new MatrixCell(this.c.clone());
  }

  toLatex() {
    return this.c.toLatex();
  }

  toString() {
    return this.c.toString();
  }

  add(elem, changeValue = true) {
    let anotherElem = elem;
    if (elem instanceof MatrixCell) anotherElem = elem.c;
    const result = this.c.add(anotherElem);
    if (changeValue) this.c = result;
    return result;
  }

  sub(elem, changeValue = true) {
    let anotherElem = elem;
    if (elem instanceof MatrixCell) anotherElem = elem.c;
    const result = this.c.sub(anotherElem);
    if (changeValue) this.c = result;
    return result;
  }

  mul(elem, changeValue = true) {
    let anotherElem = elem;
    if (elem instanceof MatrixCell) anotherElem = elem.c;
    const result = this.c.mul(anotherElem);
    if (changeValue) this.c = result;
    return result;
  }

  div(elem, changeValue = true) {
    let anotherElem = elem;
    if (elem instanceof MatrixCell) anotherElem = elem.c;
    const result = this.c.div(anotherElem);
    if (changeValue) this.c = result;
    return result;
  }

  equals(elem) {
    let anotherElem = elem;
    if (elem instanceof MatrixCell) anotherElem = elem.c;
    const result = this.c.equals(anotherElem);
    return result;
  }
}

export const getCell = value => {
  if (value instanceof Fraction) return new MatrixCell(value);
  else if (value instanceof MatrixCell) return value.copy();
  else if (typeof value === 'string') {
    const fixedValue = getSignFixedFraction(value);

    try {
      return new MatrixCell(fixedValue);
    } catch (err) {
      const num = Number(value);
      if (isNaN(num)) throw new Error('Bad type of cell argument');

      return new MatrixCell(num);
    }
  } else if (typeof value === 'number') {
    return new MatrixCell(value);
  }
  throw new Error('Bad type of cell argument');
};
