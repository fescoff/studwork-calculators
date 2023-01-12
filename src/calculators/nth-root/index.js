import { inputNumber } from '@/utils';

import { numberValidator2 } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'n-root',
  data: () => ({
    form: {
      number: '',
      power: '',
    },
  }),
  computed: {
    number() {
      return inputNumber(this.form.number, {
        float: true,
        negative: false,
        divisional: true,
      });
    },
    power() {
      return inputNumber(this.form.power, {
        float: true,
        negative: true,
        divisional: true,
      });
    },

    validators() {
      return {
        number: numberValidator2(this.number, { minimum: 0, maximum: 99999 }),
        power: numberValidator2(this.power, { minimum: -99999 }),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;
      
      return null;
    },

    decision() {
      if (this.formInvalid) return null;
      return Math.pow(this.number, 1 / this.power);
    },
  },
};
