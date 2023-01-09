import {
  validator,
  required2,
  isNumber,
  isIntegerNumber,
  min,
  max,
} from '@/services/validator2';

export function getSubPod(res, podId, returnArray = false) {
  try {
    const pod = res.pods.find(pod => pod.id === podId);
    if (returnArray && pod.subpods.length) return pod.subpods;
    return pod.subpods[0];
  } catch (err) {
    return null;
  }
}

export function factorial(num) {
  let result = 1;

  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  return result;
}

export const formulaValidator = (value, required = true, ...validators) => {
  // @todo Починить эту регулярку
  const regex = /^[|.`xyzsqrt()sexpsinco<>=st,ancotlg0-9+\\^*/-]+$/gi;

  const formValidator = value => {
    value = value.trim();
    if (value === '' && !required) return true;
    if (!regex.test(value)) {
      return 'Проверьте условие';
    }
  };

  return validator(value, formValidator, ...validators);
};

export const sinCosValidator = (value, ...validators) =>
  validator(
    value,
    required2('Введите число'),
    isNumber('Число некорректно'),
    min(-1, 'Должно быть больше либо равно -1'),
    max(1, 'Должно быть меньше либо равно 1'),
    ...validators,
  );

export const numberValidator = (
  value,
  { maximum = 99, minimum = null } = {},
  ...validators
) =>
  validator(
    value,
    required2('Введите число'),
    isNumber('Число некорректно'),
    isIntegerNumber('Должно быть целым числом'),
    minimum !== null ? min(minimum) : min(0.001, 'Должно быть больше нуля'),
    max(maximum),
    ...validators,
  );

export const numberValidator2 = (
  value,
  { maximum = 99, minimum = null } = {},
  ...validators
) =>
  validator(
    value,
    required2('Введите число'),
    isNumber('Число некорректно'),
    minimum !== null ? min(minimum) : min(0.001, 'Должно быть больше нуля'),
    max(maximum),
    ...validators,
  );

export const scalarNumberValidator = (value, name, ...validators) =>
  validator(
    value,
    required2('Введите число'),
    isNumber('Число некорректно'),
    min(0.001, name + ' должна быть больше нуля'),
    max(10000),
    ...validators,
  );

export const radiusValidator = (value, ...validators) =>
  validator(
    value,
    required2('Введите число'),
    isNumber('Число некорректно'),
    min(0.001, 'Радиус должен быть больше нуля'),
    max(10000),
    ...validators,
  );

export const diameterValidator = (value, ...validators) =>
  validator(
    value,
    required2('Введите число'),
    isNumber('Число некорректно'),
    min(0.001, 'Диаметр должен быть больше нуля'),
    max(10000),
    ...validators,
  );

export const angleValidator = (value, ...validators) =>
  validator(
    value,
    required2('Введите число'),
    isNumber('Число некорректно'),
    min(0.001, 'Угол должен быть больше нуля'),
    max(360, 'Угол не должен быть больше 360°'),
    ...validators,
  );

export const radianValidator = (value, ...validators) =>
  validator(
    value,
    required2('Введите число'),
    isNumber('Число некорректно'),
    min(0, 'Радиан не может быть меньше нуля'),
    val => (val <= Math.PI * 2 ? true : 'Радиан должен быть меньше 2π'),
    ...validators,
  );

export const radGrad = {
  0: 0,
  0.524: 30,
  0.785: 45,
  1.047: 60,
  1.571: 90,
  2.094: 120,
  2.356: 135,
  2.618: 150,
  3.142: 180,
  3.665: 210,
  3.927: 225,
  4.189: 240,
  4.712: 270,
  5.236: 300,
  5.498: 315,
  5.76: 330,
  6.283: 360,
};
