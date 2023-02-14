import { inputNumber } from '@/utils';

import { numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'division-with-remainder',
  data: () => ({
    form: {
      dividend: '',
      divisor: '',
    },
  }),
  computed: {
    dividend() {
      return inputNumber(this.form.dividend, {
        float: true,
        negative: true,
        divisional: false,
      });
    },
    divisor() {
      return inputNumber(this.form.divisor, {
        float: true,
        negative: true,
        divisional: false,
      });
    },
    validators() {
      return {
        dividend: numberValidator(this.dividend, { maximum: 9999999999 }),
        divisor: numberValidator(this.divisor, { maximum: 9999999999 }),
      };
    },

    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) {
        if (this.validators.dividend.message.length > 1) {
          return this.validators.dividend.message;
        } else if (this.validators.divisor.message.length > 1) {
          return this.validators.divisor.message;
        }
      }
      return null;
    },

    decision() {
      if (this.formInvalid) return null;
      const quotient = Math.floor(this.dividend / this.divisor);
      const remainder = this.dividend % this.divisor;
      return { quotient, remainder };
    },
  },
};
