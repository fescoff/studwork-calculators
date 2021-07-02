import { inputNumber } from '@/utils';

import { radiusValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  name: 'capacity-of-sphere',
  data: () => ({
    form: {
      radius: '',
    },
  }),
  computed: {
    radius() {
      return inputNumber(this.form.radius, {
        float: true,
        negative: true,
        divisional: false,
      });
    },

    validators() {
      return {
        radius: radiusValidator(this.radius),
      };
    },

    decision() {
      if (this.formInvalid) return null;

      return (4 / 3) * Math.PI * Math.pow(this.radius, 3);
    },
  },
};
