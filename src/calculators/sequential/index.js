import { inputNumber } from '@/utils';

import { numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'is-sequential',
  data: () => ({
    form: {
      number: '',
    },
  }),
  computed: {
    number() {
      return inputNumber(this.form.number, {
        float: false,
        negative: true,
        divisional: false,
      });
    },

    validators() {
      return {
        number: numberValidator(this.number, { maximum: 99999 }),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return this.validators.number.message;
      return null;
    },

    decision() {
      if (this.formInvalid) return null;
      function isSequential(num) {
        for (let i = 1; i < num; i++) {
          let sum = 0;
          for (let j = i; sum < num; j++) {
            sum += j;
            if (sum === num) {
              return true;
            }
            if (sum > num) {
              break;
            }
          }
        }
        return false;
      }

      const result = isSequential(this.number);
      let output = '';
      if (result) {
        for (let i = 1; i < this.number; i++) {
          let sum = 0;
          let sequence = '';
          for (let j = i; sum < this.number; j++) {
            sum += j;
            sequence += `${j}+`;
            if (sum === this.number) {
              output += `${sequence.slice(0, -1)}=${this.number}\n\r`;
              break;
            }
            if (sum > this.number) {
              break;
            }
          }
        }
      }
      return output;
    },
  },
};
