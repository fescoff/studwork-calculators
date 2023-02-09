import { inputNumber } from '@/utils';

import { scalarNumberValidator, numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'rounded-numbers',
  data: () => ({
    form: {
      number: '',
      precision: '',
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
    precision() {
      return inputNumber(this.form.precision, {
        float: false,
        negative: true,
        divisional: false,
      });
    },

    validators() {
      return {
        number: scalarNumberValidator(this.number),
        precision: numberValidator(this.precision, { minimum: 0 }),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;
      return null;
    },

    decision() {
      if (this.formInvalid) return null;
      return this.round(this.number, this.precision);
    },
  },
};
