export const required = (message = 'Обязательное поле') => val => {
  if (val === 0) return true;
  const len = (val + '').length;
  return val && len > 0 ? true : message;
};

export const required2 = (message = 'Обязательное поле') => val => {
  const len = (val + '').length;
  return typeof val !== 'undefined' && val !== null && !isNaN(val) && len > 0
    ? true
    : message;
};

export const isNumber = (message = 'Число некорректно') => val => {
  if (typeof val === 'number' && !isNaN(val) && isFinite(val)) return true;
  if (val && /^\d+(\.\d+)?$/.test(val)) return true;
  return message;
};

export const isIntegerNumber = (message = 'Должно быть целым числом') => val => {
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
  if (typeof val === 'number' && Number.isFinite(val) && !(val % 1)) return true;
  if (val && /^\d+$/.test(val)) return true;
  return message;
};

export const min = (min, message) => val => {
  const msg = message || `Не меньше ${min}`;
  return val >= min ? true : msg;
};

export const max = (max, message) => val => {
  const msg = message || `Не больше ${max}`;
  return val <= max ? true : msg;
};

export const email = (message = 'Неверный формат электронной почты') => val => {
  const emailRx = /.+@.+\..+/i;
  return emailRx.test(val) ? true : message;
};

export const phone = message => val => {
  const msg =
    message ||
    [
      'Номер телефона должен быть в международном формате:',
      'для России +7 9031234565,',
      'для Украины +380 981234567,',
      'для Беларуси: +375 123456100',
    ].join(' ');
  const emailRx = /^\d{11,}$/;

  return emailRx.test(val) ? true : msg;
};

export const length = (len, message) => val => {
  const valueLength = (val + '').length;
  const msg = message || `Должно быть ровно ${len} символов`;
  return len === valueLength ? true : msg;
};

export const minLength = (min, message) => val => {
  const msg = message || `Не меньше ${min} символов`;
  const len = (val + '').length;
  return len >= min ? true : msg;
};

export const maxLength = (max, message) => val => {
  const msg = message || `Не больше ${max} символов`;
  const len = (val + '').length;
  return len <= max ? true : msg;
};

export const pattern = (rx, message = 'Неверный формат') => val => {
  return rx.test(val) ? true : message;
};

export const url = (message = 'Некорректный URL') => val => {
  /* eslint-disable-next-line */
  return /https?:\/\/[-a-zA-Z0-9@:%._\+~#=\/]{1,256}/.test(val) ? true : message;
};
