import { inputNumber } from '@/utils';

import { scalarNumberValidator } from '../utils';
import mixin from '../mixin';

export default {
  mixins: [mixin],
  // todo: Название калькулятора
  name: 'is-sequential',
  data: () => ({
    form: {
      // todo: Переменные для расчёта
      number: '',
    },
  }),
  computed: {
    number() {
      return inputNumber(this.form.number, {
        float: false,
        negative: false,
        divisional: false,
      });
    },

    // todo: Список валидаторов для обработанных данных из формы
    validators() {
      return {
        number: scalarNumberValidator(this.number, 'Длина'),
      };
    },
    errorMessage() {
      if (!this.hasAttempt || this.formInvalid) return null;

      return null;
    },

    decision() {
      if (this.formInvalid) return null;

      // todo: расчёт результата
      function isSequential(num) {
        for (let i = 1; i < num; i++) {
          let sum = 0;
          for (let j = i; sum < num; j++) {
            sum += j;
            if (sum === num) {
              return true;
            }
            if (sum > num) {
              break;
            }
          }
        }
        return false;
      }

      const result = isSequential(this.number);
      let output = '';
      if (result) {
        for (let i = 1; i < this.number; i++) {
          let sum = 0;
          let sequence = '';
          for (let j = i; sum < this.number; j++) {
            sum += j;
            sequence += `${j}+`;
            if (sum === this.number) {
              output += `${sequence.slice(0, -1)}=${this.number}\n\r`;
              break;
            }
            if (sum > this.number) {
              break;
            }
          }
        }
      }
      return output;
    },
  },
};
