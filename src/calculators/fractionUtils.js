import Fraction from 'fraction.js';

import { validator } from '@/services/validator2';

export const getReduceFraction = (fractionArgs, reduceValue) => {
  const reduceValueBefore = Fraction.REDUCE;
  Fraction.REDUCE = reduceValue;

  try {
    return new Fraction(fractionArgs);
  } catch (err) {
    throw err;
  } finally {
    Fraction.REDUCE = reduceValueBefore;
  }
};

export const getSignFixedFraction = value => {
  value = value.replace(/ /g, '');
  const regexp = /^[+-]*\d+(\.\d+)?([/\\:][+-]*\d+(\.\d+)?)?$/;
  if (!regexp.test(value)) return null;
  value = value.replace('\\', '/');
  value = value.replace(/\+/g, '');

  const minusCount = (value.match(/-/g) || []).length;
  const isNeedMinus = minusCount % 2;
  value = value.replace(/-/g, '');

  return isNeedMinus ? `-${value}` : value;
};

export const getFraction = (value, reduce = true) => {
  const fixedValue = getSignFixedFraction(value);
  if (fixedValue === null) return new Fraction();

  try {
    return getReduceFraction(fixedValue, reduce);
  } catch (err) {
    return new Fraction();
  }
};

export const getFractionMul = (oldFraction, mulValue) => {
  const newFraction = getReduceFraction(oldFraction, false);

  newFraction.d = newFraction.d * mulValue;
  newFraction.n = newFraction.n * mulValue;

  return newFraction;
};

const fractionErrorValidator = value => {
  if (!value) return 'Неправильный формат дроби';

  const fixedValue = getSignFixedFraction(value);
  if (fixedValue === null) return 'Неправильный формат дроби';
  try {
    // eslint-disable-next-line
    new Fraction(fixedValue);
  } catch (err) {
    if (err.name === 'DivisionByZero') return 'Деление на ноль запрещено';
    else if (err.name === 'InvalidParameter') return 'Неправильный формат дроби';
    else return err.name;
  }
};

export const fractionValidator = (value, ...validators) => {
  return validator(value, fractionErrorValidator, ...validators);
};

export const matrixArrValidator = (value, ...validators) => {
  if (value) {
    const matrixValidators = value.map(row =>
      row.map(cell => {
        return validator(cell, fractionErrorValidator, ...validators);
      }),
    );

    return matrixValidators;
  }

  return { invalid: true, valid: false, message: '' };
};

// export const matrixValidator = (value, ...validators) => {
//   const matrixValidators = [];

//   const matrixLocalValidatorFactory = (localValue) => () => matrixLocalValidator(localValue);

//   value.forEach((cell) => {
//     matrixValidators.push(matrixLocalValidatorFactory(cell.c))
//   });

//   return validator(
//     value,
//     ...matrixValidators,
//     ...validators,
//   );
// }
