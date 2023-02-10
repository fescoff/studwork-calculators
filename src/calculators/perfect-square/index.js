import { inputNumber } from '@/utils';

import { numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'perfect-square',
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
        divisional: true,
      });
    },

    validators() {
      return {
        number: numberValidator(this.number, { minimum: 0 }),
      };
    },

    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return this.validators.number.message;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      if (this.number < 0) {
        return `${this.number} не является идеальным квадратом`;
      } else if (this.number == 0 || this.number == 1) {
        return `${this.number} является идеальным квадратом`;
      } else {
        let i = 2;
        while (i * i <= this.number) {
          if (i * i == this.number) {
            return `${this.number} является идеальным квадратом: ${i} ⋅ ${i}`;
          }
          i++;
        }
        return `${this.number} не является идеальным квадратом`;
      }
    },
  },
};
