import { arrayNumber } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'sum-of-numbers',
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
        numbers: arrayNumber(this.numbers),
      };
    },

    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      return this.numbers.reduce((acc, val) => acc + val);
    },
  },
};
