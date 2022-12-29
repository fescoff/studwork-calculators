import { inputNumber } from '@/utils';

import { scalarNumberValidator } from '../utils';
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
        float: false,
        negative: false,
        divisional: false,
      });
    },

    validators() {
      return {
        number: scalarNumberValidator(this.number),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

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
