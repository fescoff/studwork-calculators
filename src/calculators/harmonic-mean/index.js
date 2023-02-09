import { arrayNumber } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'harmonic-mean',
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

      const sum = this.numbers.reduce((a, c) => a + 1 / c, 0);
      return this.round(this.numbers.length / sum, 3);
    },
  },
};
