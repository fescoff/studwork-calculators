import { inputNumber } from '@/utils';

import { numberValidator2 } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'cube-root',
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
        number: numberValidator2(this.number, { minimum: -99999, maximum: 99999 }),
      };
    },

    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      return Math.cbrt(this.number);
    },
  },
};
