import { arrayNumber } from '../utils';
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
      const sum = this.numbers.reduce((a, b) => a + b, 0);
      const avg = sum / this.numbers.length;
      return this.round(avg, 3);
    },
  },
};
