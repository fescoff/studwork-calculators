export default {
  props: {
    value: {
      required: true,
    },

    option: {
      type: Object,
      required: true,
    },
  },

  computed: {
    compValue: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit('input', newVal);
      },
    },
  },
};
