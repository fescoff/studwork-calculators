import { scrollToElem } from '@/utils/scroll';

export default {
  props: {
    hideMatrixForm: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      matrixInputShowed: this.hideMatrixForm,
    };
  },

  methods: {
    confirmMatrix() {
      this.$emit('submit');
    },

    showMatrixInput(data) {
      this.matrixInputShowed = true;
      this.scrollToMatrixInput();
    },

    scrollToMatrixInput() {
      this.$nextTick(() => scrollToElem(this.$refs.matrixInput, { behavior: 'smooth' }));
    },
  },
};
