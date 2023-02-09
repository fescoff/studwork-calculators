import { arrayNumber } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'geometric-mean',
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
      const avg = this.round(
        Math.pow(
          this.numbers.reduce((p, c) => p * c),
          1 / this.numbers.length,
        ),
        3,
      );
      return avg;
    },
  },
};
