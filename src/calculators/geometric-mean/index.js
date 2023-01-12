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
      let product = 1;
      for (let i = 0; i < this.numbers.length; i++) {
        product *= this.numbers[i];
      }
      const avg = Math.pow(product, 1 / this.numbers.length);
      return avg;
    },
  },
};
