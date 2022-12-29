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
