import { inputNumber } from '@/utils';

import { scalarNumberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'perimeter-of-square',
  data: () => ({
    form: {
      sideA: '',
    },
  }),
  computed: {
    sideA() {
      return inputNumber(this.form.sideA, {
        float: true,
        negative: true,
        divisional: false,
      });
    },

    validators() {
      return {
        sideA: scalarNumberValidator(this.sideA, 'Длина'),
      };
    },

    decision() {
      if (this.formInvalid) return null;

      return this.sideA * 4;
    },
  },
};
