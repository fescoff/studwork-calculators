import focusInvalid from '@/utils/dom/focus-invalid';

import Carcass from './carcass';
import CalculatorInput from './calculator-input';
import SubmitButton from './submit-button';

export default {
  inheritAttrs: false,
  components: {
    Carcass,
    CalculatorInput,
    SubmitButton,
    Formula: () => import('./formula'),
  },
  data: () => ({
    hasAttempt: false,
    form: {},
    stats: null,
  }),
  watch: {
    'form.calcBy'() {
      this.hasAttempt = false;
    },
  },
  computed: {
    errorMessage() {
      return '';
    },
    validators() {
      return {};
    },
    formInvalid() {
      return Object.values(this.validators).some(validator => validator.invalid);
    },

    decision() {
      return null;
    },

    decisionSlotData() {
      return {
        form: this.form,
        decision: this.decision,
      };
    },

    calcName() {
      return this.$options.name;
    },
  },
  methods: {
    checkForm() {
      this.hasAttempt = true;

      if (this.formInvalid) return this.$nextTick(() => focusInvalid(this.$el));

      return true;
    },

    doDecision() {
      if (!this.checkForm()) return;

      const hasErrorMessage = !!this.errorMessage;
      const isDecisionValid =
        typeof this.decision === 'number'
          ? !isNaN(this.decision) && isFinite(this.decision)
          : this.decision !== null;

      if (hasErrorMessage || !isDecisionValid) return;

      this.$refs.carcass && this.$refs.carcass.showDecision(this.decisionSlotData);
    },

    radToDeg: rad => (rad * 180) / Math.PI,
    degToRad: deg => (Math.PI * deg) / 180,

    round(number, precision = 3) {
      const isValidNumber =
        typeof number === 'number' && !isNaN(number) && isFinite(number);
      if (!isValidNumber) return null;

      return Math.round(number * 10 ** precision) / 10 ** precision;
    },
  },
};
