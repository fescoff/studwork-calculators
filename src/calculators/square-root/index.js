import { inputNumber } from '@/utils';

import { scalarNumberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'square-root',
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
        number: scalarNumberValidator(this.number, 'Число'),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return this.validators.number.message;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;
      const result = Math.sqrt(this.number);
      return this.round(result, 10);
    },
  },
};
