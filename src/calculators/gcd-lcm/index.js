import { inputNumber } from '@/utils';

import { numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'gcd-lcm',
  data: () => ({
    form: {
      a: '',
      b: '',
    },
  }),
  computed: {
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
    validators() {
      return {
        a: numberValidator(this.a, { maximum: 99999 }),
        b: numberValidator(this.b, { maximum: 99999 }),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) {
        if (this.validators.a.message.length > 1) {
          return this.validators.a.message;
        } else if (this.validators.b.message.length > 1) {
          return this.validators.b.message;
        }
      }
      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      function getPrimeFactors(n) {
        let factors = [];
        for (let i = 2; i <= n; i++) {
          while (n % i === 0) {
            factors.push(i);
            n = n / i;
          }
        }

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
