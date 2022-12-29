import { inputNumber } from '@/utils';

import { scalarNumberValidator, numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'rounded-numbers',
  data: () => ({
    form: {
      number: '',
      length: '',
    },
  }),
  computed: {
    number() {
      return inputNumber(this.form.number, {
        float: true,
        negative: true,
        divisional: false,
      });
    },
    length() {
      return inputNumber(this.form.length, {
        float: false,
        negative: true,
        divisional: false,
      });
    },

    validators() {
      return {
        number: scalarNumberValidator(this.number),
        length: numberValidator(this.length, { minimum: 0 }),
      };
    },  
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;
      return Number(Math.round(this.number + 'e' + this.length) + 'e-' + this.length);
    },
  },
};
