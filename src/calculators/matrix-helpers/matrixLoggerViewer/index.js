import Formula from '../../formula';

export default {
  name: 'MatrixLoggerViewer',

  components: { Formula },

  props: {
    logger: {
      type: Object,
      default: null,
    },
  },

  computed: {
    steps() {
      if (!this.logger) return [];

      return this.logger.steps;
    },
  },
};
