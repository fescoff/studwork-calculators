export default {
  props: {
    value: {
      required: true,
    },

    options: {
      type: Array,
      default: () => [],
    },

    placeholder: {
      type: String,
      default: '',
    },

    multilevel: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    readonly: {
      type: Boolean,
      default: false,
    },

    canBeEmpty: {
      type: Boolean,
      default: false,
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
