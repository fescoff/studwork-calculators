import { getFraction } from '../fractionUtils';

import mixin from '../mixin';
import matrixMixin from '../matrixMixin';

import { createRectangle } from './../matrix-helpers/utils';
import VectorsInput from './../vectors-input';

export default {
  mixins: [matrixMixin, mixin],

  name: 'vectors-sum',

  components: { VectorsInput },

  data() {
    return {
      matrices: {
        vectors: createRectangle(2, 3, ''),
      },
      matrixHasAttempt: true,
    };
  },

  computed: {
    decision() {
      if (this.matrixSecondFormInvalid) return null;

      const resultObject = {
        given: {
          a: null,
          b: null,
        },
        solution: null,
        answer: null,
      };

      const vectors = this.matrices.vectors.map(row =>
        row.map(cell => getFraction(cell)),
      );
      resultObject.given.a = `\\overrightarrow{a}(${vectors[0]
        .map(cell => cell.toLatex())
        .join('; ')})`;
      resultObject.given.b = `\\overrightarrow{b}(${vectors[1]
        .map(cell => cell.toLatex())
        .join('; ')})`;

      const tl = (index1, index2) => vectors[index1][index2].toLatex();

      const resultVector = vectors[0].map((v, index) => v.add(vectors[1][index]));
      const resultVectorTex = `\\overrightarrow{c}(${resultVector
        .map(cell => cell.toLatex())
        .join('; ')})`;

      resultObject.solution = `\\overrightarrow{a} + \\overrightarrow{b} =
        (${tl(0, 0)} + ${tl(1, 0)})\\overrightarrow{i} +
        (${tl(0, 1)} + ${tl(1, 1)})\\overrightarrow{j} +
        (${tl(0, 2)} + ${tl(1, 2)})\\overrightarrow{k} = ${resultVectorTex}
      `;

      resultObject.answer = resultVectorTex;

      return resultObject;
    },
  },

  methods: {
    recalcMatrix() {},
  },
};
