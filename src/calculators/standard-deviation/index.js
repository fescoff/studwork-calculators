import { test } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'avg-arithmetic',
  data: () => ({
    form: {
      numbers: '',
    },
  }),
  computed: {
    numbers() {
      return (this.form.numbers.match(/\d+/g) ?? []).map(Number);
    },

    validators() {
      return {
        numbers: test(this.numbers),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

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
