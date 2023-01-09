import { inputNumber } from '@/utils';

import { scalarNumberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'sum-of-numbers-to-n',
  data: () => ({
    form: {
      length: '',
    },
  }),
  computed: {
    length() {
      return inputNumber(this.form.length, {
        float: false,
        negative: false,
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
      let sum = 0;

      for (let i = 1; i <= this.length; i++) {
        sum += i;
      }
      return sum;
    },
  },
};
