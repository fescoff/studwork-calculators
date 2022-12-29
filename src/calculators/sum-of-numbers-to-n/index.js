import { inputNumber } from '@/utils';

import { scalarNumberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  // todo: Название калькулятора
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
      let arr = [];
      for (let i = 1; i <= this.length; i++) {
        arr.push(i);
        sum += i;
      }
      const str = arr.join('+');
      return { sum, str };
    },
  },
};
