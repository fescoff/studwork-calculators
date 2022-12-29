import { inputNumber } from '@/utils';

import { scalarNumberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'fibonacci-numbers',
  data: () => ({
    form: {
      length: '',
    },
  }),
  computed: {
    length() {
      return inputNumber(this.form.length, {
        float: true,
        negative: true,
        divisional: false,
      });
    },

    validators() {
      return {
        length: scalarNumberValidator(this.length),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

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
      return getFibonacciNumbers(this.length);
    },
  },
};
