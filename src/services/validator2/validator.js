// Пример использования
// validator(this.url, required('Не меньше 10'), max(20, 'Не больше 20'));

export const validator = (value, ...checks) => {
  const defaultVal = { valid: true, invalid: false, message: '' };

  return checks.reduce((acc, check) => {
    if (acc.invalid) return acc;
    const result = check(value);

    if (typeof result === 'string') {
      acc.valid = false;
      acc.invalid = true;
      acc.message = result;
    }

    return acc;
  }, defaultVal);
};
