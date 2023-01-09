import kebabCase from 'lodash/kebabCase';

export const calculators = {
  capacityOfSphere: {
    component: () => import('./capacity-of-sphere'),
    title: 'Объём сферы',
  },
  perimeterOfSquare: {
    component: () => import('./perimeter-of-square'),
    title: 'Периметр квадрата',
  },
  sinus: {
    component: () => import('./sinus'),
    title: 'Синус',
  },
  cosine: {
    component: () => import('./cosine'),
    title: 'Косинус',
  },
  vectorsSum: {
    component: () => import('./vectors-sum'),
    title: 'Сумма векторов',
  },
  matrixSum: {
    component: () => import('./matrix-sum'),
    title: 'Сложение матриц',
  },
  fibonacci: {
    component: () => import('./fibonacci-numbers'),
    title: 'Ряд чисел Фиббоначи',
  },
  factorial: {
    component: () => import('./factorial'),
    title: 'Факториал числа',
  },
  roundedNumbers: {
    component: () => import('./rounded-numbers'),
    title: 'Округление чисел',
  },
  perfectSquare: {
    component: () => import('./perfect-square'),
    title: 'Идеальный квадрат',
  },
  divisionWithRemainder: {
    component: () => import('./division-with-remainder'),
    title: 'Деление с остатком',
  },
  sumOfNumbersToN: {
    component: () => import('./sum-of-numbers-to-n'),
    title: 'Сумма числел от 1 до N',
  },
  sumOfNumbersToN: {
    component: () => import('./gcd-lcm'),
    title: 'НОД и НОК двух чисел',
  },
  sequential: {
    component: () => import('./sequential'),
    title: 'Последовательное число',
  },
  primeNumbers: {
    component: () => import('./prime-numbers'),
    title: 'Простое число',
  },
  primeFactors: {
    component: () => import('./prime-factors'),
    title: 'Разложение числа на простые множители',
  },
  numberExponentiations: {
    component: () => import('./number-exponentiation'),
    title: 'Возведение числа в степень',
  },
  exponentPower: {
    component: () => import('./exponent-power'),
    title: 'Возведение экспоненты в степень',
  },
  squareRoot: {
    component: () => import('./square-root'),
    title: 'Квадратный корень',
  },
  cubeRoot: {
    component: () => import('./cube-root'),
    title: 'Кубический корень',
  },
  nthRoot: {
    component: () => import('./nth-root'),
    title: 'Извлечение корня n-й степени из числа',
  },
  // example: {
  //   component: () => import('./'),
  //   title: '',
  // },
};

Object.keys(calculators).forEach(key => {
  calculators[key].kebab = kebabCase(key);
});

export const components = Object.keys(calculators).reduce((acc, key) => {
  acc[key] = calculators[key].component;
  return acc;
}, {});

export const list = Object.keys(calculators).map(cmp => kebabCase(cmp));
