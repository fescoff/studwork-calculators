import focusInvalid from '@/utils/dom/focus-invalid';

import { matrixArrValidator } from './fractionUtils';

import {
  MatrixCarcass,
  LoggerViewer,
  MatrixInput,
  ContinueButton,
} from './matrix-helpers';

export default {
  components: {
    MatrixCarcass,
    MatrixInput,
    ContinueButton,
    LoggerViewer,
  },

  data() {
    return {
      matrixForm: {},
      matrixHasAttempt: false,
      matriceValidators: {},
      matrices: {},
    };
  },

  computed: {
    matrixFormInvalid() {
      return Object.values(this.matrixValidators).some(validator => validator.invalid);
    },

    matrixValidators() {
      return {};
    },

    matrixSecondFormInvalid() {
      return Object.values(this.matriceValidators)
        .flat(2)
        .some(validator => validator.invalid);
    },

    decisionSlotData() {
      return {
        matrixForm: this.matrixForm,
        decision: this.decision,
        matrices: this.matrices,
      };
    },
  },

  watch: {
    matrices: {
      deep: true,
      immediate: true,
      handler(newVal) {
        const resultValidators = {};

        Object.keys(this.matrices).forEach(key => {
          resultValidators[key] = matrixArrValidator(this.matrices[key]);
        });

        this.matriceValidators = resultValidators;
      },
    },
  },

  methods: {
    doMatrix() {
      this.matrixHasAttempt = true;

      if (this.matrixFormInvalid) return this.$nextTick(() => focusInvalid(this.$el));

      this.recalcMatrix();
      this.hasAttempt = false;

      this.$refs.matrixCarcass && this.$refs.matrixCarcass.showMatrixInput();
    },

    confirmMatrix() {
      this.hasAttempt = true;
      if (this.matrixSecondFormInvalid)
        return this.$nextTick(() => this.$refs.matrixCarcass.scrollToMatrixInput());
      this.hasAttempt = false;

      this.doDecision();
    },
  },
};
