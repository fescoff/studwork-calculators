import { inputNumber } from '@/utils';

import { numberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'tetrahedral-number',
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
        number: numberValidator(this.number),
      };
    },

    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      return (this.number * (this.number + 1) * (this.number + 2)) / 6;
    },
  },
};
