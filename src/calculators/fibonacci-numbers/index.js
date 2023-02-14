import { inputNumber } from '@/utils';

import { numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'fibonacci-numbers',
  data: () => ({
    form: {
      n: '',
    },
  }),
  computed: {
    n() {
      return inputNumber(this.form.n, {
        float: false,
        negative: false,
        divisional: false,
      });
    },
    validators() {
      return {
        n: numberValidator(this.n, { minimum: 1, maximum: 999 }),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return this.validators.n.message;
      return null;
    },

    decision() {
      if (this.formInvalid) return null;
      function getFibonacciNumbers(n) {
        let fibonacciNumbers = '';
        let a = 0;
        let b = 1;
        for (let i = 1; i <= n; i++) {
          fibonacciNumbers += `${b} `;
          let c = a + b;
          a = b;
          b = c;
        }
        return fibonacciNumbers;
      }
      return getFibonacciNumbers(this.n);
    },
  },
};
