import { inputNumber } from '@/utils';

import { scalarNumberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  // todo: Название калькулятора
  name: 'calculator-name',
  data: () => ({
    form: {
      // todo: Переменные для расчёта
      sideA: '',
      sideB: '',
    },
  }),
  computed: {
    // todo: Приведение данных из формы к нормальным типам для вычислений
    sideA() {
      return inputNumber(this.form.sideA, {
        float: true,
        negative: true,
        divisional: false,
      });
    },
    sideB() {
      return inputNumber(this.form.sideB, {
        float: true,
        negative: true,
        divisional: false,
      });
    },

    // todo: Список валидаторов для обработанных данных из формы
    validators() {
      return {
        sideA: scalarNumberValidator(this.sideA, 'Длина'),
        sideB: scalarNumberValidator(this.sideB, 'Длина'),
      };
    },
    // todo: текст глобальной ошибки
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      // todo: расчёт результата
      return this.sideA * this.sideB;
    },
  },
};
