import { inputNumber } from '@/utils';

import { numberValidator2 } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  // todo: Название калькулятора
  name: 'calculator-name',
  data: () => ({
    form: {
      // todo: Переменные для расчёта
      number: '',
    },
  }),
  computed: {
    // todo: Приведение данных из формы к нормальным типам для вычислений
    number() {
      return inputNumber(this.form.number, {
        float: true,
        negative: true,
        divisional: true,
      });
    },

    // todo: Список валидаторов для обработанных данных из формы
    validators() {
      return {
        number: numberValidator2(this.number, { minimum: -99999, maximum: 99999 }),
      };
    },
    // todo: текст глобальной ошибки
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      return Math.cbrt(this.number);
    },
  },
};
