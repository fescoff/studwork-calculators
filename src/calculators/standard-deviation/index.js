import { arrayNumber } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'standard-deviation',
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
        numbers: arrayNumber(this.numbers, { minimum: -999999 } ),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return this.validators.numbers.message;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      const mean = this.numbers.reduce((a, b) => a + b) / this.numbers.length;
      const squareDeviation = this.numbers.reduce((a, b) => a + (b - mean) ** 2, 0);
      const standardDeviation = Math.sqrt(squareDeviation / this.numbers.length);
      return standardDeviation;
    },
  },
};
