/**
 * @param rawNumber
 * @param {{}} [config]
 * @param [config.float=true]
 * @param [config.divisional=true]
 * @param [config.negative=true]
 * @returns {number|NaN|Infinity}
 */
export default function inputNumber(
  rawNumber,
  { float = true, divisional = false, negative = false } = {},
) {
  let result = rawNumber.trim();

  if (divisional && result.startsWith('/')) {
    result = result.split('/');
    if (result.length > 2) return NaN;

    result = result.map(number =>
      inputNumber(number, { divisional: false, float, negative }),
    );

    if (result.some(number => isNaN(number))) return NaN;

    return result
      .slice(1)
      .reduce((fractionResult, number) => fractionResult / number, result[0]);
  }

  let factor = 1;
  if (negative && result.indexOf('-') === 0) {
    result = rawNumber.slice(1);
    factor = -1;
  }

  if (float && /[.,]/g.test(result)) {
    if (!/^[\d.,]+$/g.test(result)) return NaN;

    result = result.replace(/,/g, '.');

    if (result.split('.').length > 2) return NaN;

    result = parseFloat(result);
  } else {
    if (!/^\d+$/g.test(result)) return NaN;

    result = parseInt(result, 10);
  }

  return result * factor;
}
