import { inputNumber } from '@/utils';

import { numberValidator2 } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'exponent-power',
  data: () => ({
    form: {
      power: '',
    },
  }),
  computed: {
    power() {
      return inputNumber(this.form.power, {
        float: true,
        negative: true,
        divisional: true,
      });
    },
    validators() {
      return {
        power: numberValidator2(this.power, { minimum: -9999, maximum: 9999 }),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;
      const exp = 2.7182818284;
      const result = Math.pow(exp, this.power);
      return this.round(result, 10);
    },
  },
};
