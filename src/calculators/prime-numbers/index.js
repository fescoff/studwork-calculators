import { inputNumber } from '@/utils';

import { numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'prime-numbers',
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
        number: numberValidator(this.number),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return this.validators.number.message;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i < num; i++) {
          if (num % i === 0) {
            return false;
          }
        }
        return true;
      }

      let lower = this.number - 1;
      let upper = this.number + 1;
      while (!isPrime(lower) || !isPrime(upper)) {
        if (!isPrime(lower) && lower > 2) lower--;
        if (!isPrime(upper)) upper++;
        if (lower < 2) break;
      }
      const prime = isPrime(this.number);
      return { lower, upper, prime };
    },
  },
};
