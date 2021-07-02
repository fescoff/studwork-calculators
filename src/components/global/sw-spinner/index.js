export default {
  props: {
    size: {
      type: String,
      default: 'medium',
    },

    padding: {
      type: [String, Object],
    },
  },

  computed: {
    styles() {
      if (!this.padding) return {};
      if (typeof this.padding === 'string') return { padding: this.padding };
      return this.padding;
    },
  },
};
