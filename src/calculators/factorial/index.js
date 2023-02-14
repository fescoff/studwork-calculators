import { inputNumber } from '@/utils';

import { numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'factorial',
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
        number: numberValidator(this.number, { maximum: 100 }),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return this.validators.number.message;
      return null;
    },

    decision() {
      if (this.formInvalid) return null;
      let result = 1;
      for (let i = 1; i <= this.number; i++) {
        result *= i;
      }
      return result;
    },
  },
};
