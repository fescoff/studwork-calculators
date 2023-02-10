import { arrayNumber } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'multiply-of-numbers',
  data: () => ({
    form: {
      numbers: '',
    },
  }),
  computed: {
    numbers() {
      return this.form.numbers
        .split(/[ ,]+/)
        .map(x => parseFloat(x))
        .filter(x => !isNaN(x));
    },
    validators() {
      return {
        numbers: arrayNumber(this.numbers, { minimum: -999999 }),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return this.validators.numbers.message;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;
      const result = this.numbers.reduce((acc, val) => acc * val);
      return this.round(result, 3);
    },
  },
};
