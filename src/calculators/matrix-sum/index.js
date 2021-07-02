import { inputNumber } from '@/utils';

import Matrix from '../matrix-helpers';
import { createRectangle } from '../matrix-helpers/utils';
import { scalarNumberValidator } from '../utils';
import mixin from '../mixin';
import matrixMixin from '../matrixMixin';

export default {
  mixins: [matrixMixin, mixin],

  name: 'matrix-sum',

  data() {
    return {
      matrixForm: {
        cols: '',
        rows: '',
      },
      matrices: {
        matrix1: null,
        matrix2: null,
      },
    };
  },

  computed: {
    cols() {
      return inputNumber(this.matrixForm.cols, {
        float: false,
        negative: false,
        divisional: false,
      });
    },

    rows() {
      return inputNumber(this.matrixForm.rows, {
        float: false,
        negative: false,
        divisional: false,
      });
    },

    matrixValidators() {
      return {
        cols: scalarNumberValidator(this.cols, 'Число столбцов'),
        rows: scalarNumberValidator(this.rows, 'Число строк'),
      };
    },

    decision() {
      if (this.matrixSecondFormInvalid) return null;

      const resultObj = {};

      const matrix1 = new Matrix(this.matrices.matrix1);
      const matrix2 = new Matrix(this.matrices.matrix2);

      resultObj.logger = matrix1.sum(matrix2);

      resultObj.end = matrix1;

      return resultObj;
    },
  },

  methods: {
    recalcMatrix() {
      if (this.matrixFormInvalid) return;

      this.matrices = {
        matrix1: createRectangle(this.rows, this.cols, ''),
        matrix2: createRectangle(this.rows, this.cols, ''),
      };
    },
  },
};
