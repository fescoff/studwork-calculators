import { inputNumber } from '@/utils';

import { numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],

  name: 'prime-factors',
  data: () => ({
    form: {
      number: '',
    },
  }),
  computed: {
    number() {
      return inputNumber(this.form.number, {
        float: true,
        negative: true,
        divisional: false,
      });
    },

    validators() {
      return {
        number: numberValidator(this.number, { maximum: 1000000 }),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return this.validators.number.message;
      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      function primeFactorize(n) {
        const factors = [];
        while (n % 2 === 0) {
          factors.push(2);
          n /= 2;
        }
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
          while (n % i === 0) {
            factors.push(i);
            n /= i;
          }
        }
        if (n > 2) {
          factors.push(n);
        }
        return factors;
      }

      return primeFactorize(this.number);
    },
  },
};
