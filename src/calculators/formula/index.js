export default {
  props: {
    text: {
      type: String,
      required: true,
    },

    jax: {
      type: Boolean,
      default: false,
    },

    config: {
      type: Object,
      default: () => ({}),
    },

    size: {
      type: String,
      default: 'normal',
      validate: item => ['normal', 'small', 'big'].includes(item),
    },

    scrollable: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    rendered: '',
    prevElem: null,
  }),

  computed: {
    defaultConfig: () => ({
      throwOnError: false,
    }),
  },

  watch: {
    text(newVal) {
      this.updateContent();
    },
  },

  mounted() {
    this.updateContent();
  },

  methods: {
    async updateContent() {
      if (this.jax) {
        if (!window.MathJax) return;

        try {
          this.rendered = this.text;
          this.$nextTick(() =>
            window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, this.$el]),
          );
        } catch (err) {
          this.$toast.error(err);
        }
      } else {
        if (!window.katex) return;

        this.rendered = window.katex.renderToString(this.text, {
          ...this.defaultConfig,
          ...this.config,
        });
      }
    },
  },
};
