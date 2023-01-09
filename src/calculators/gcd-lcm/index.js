import { inputNumber } from '@/utils';

import { numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'gcd-lcm',
  data: () => ({
    form: {
      // todo: Переменные для расчёта
      a: '',
      b: '',
    },
  }),
  computed: {
    // todo: Приведение данных из формы к нормальным типам для вычислений
    a() {
      return inputNumber(this.form.a, {
        float: true,
        negative: true,
        divisional: false,
      });
    },
    b() {
      return inputNumber(this.form.b, {
        float: true,
        negative: true,
        divisional: false,
      });
    },

    // todo: Список валидаторов для обработанных данных из формы
    validators() {
      return {
        a: numberValidator(this.a, { maximum: 99999 }),
        b: numberValidator(this.b, { maximum: 99999 }),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      // todo: расчёт результата
      // Функция для разложения числа на простые множители
      function getPrimeFactors(n) {
        let factors = [];
        // Перебираем все числа от 2 до n
        for (let i = 2; i <= n; i++) {
          while (n % i === 0) {
            factors.push(i);
            n = n / i;
          }
        }
        // Возвращаем строку с множителями
        return factors;
      }

      const commonFactors = [];
      for (let i = 2; i <= this.a && i <= this.b; i++) {
        if (this.a % i === 0 && this.b % i === 0) {
          commonFactors.push(i);
        }
      }

      function gcdFunction(a, b) {
        if (b === 0) {
          return a;
        }
        return gcdFunction(b, a % b);
      }

      const gcd = gcdFunction(this.a, this.b);
      const lcm = (this.a * this.b) / gcd;
      const factorsA = getPrimeFactors(this.a);
      const factorsB = getPrimeFactors(this.b);

      return { lcm, gcd, factorsA, factorsB, commonFactors };
    },
  },
};
