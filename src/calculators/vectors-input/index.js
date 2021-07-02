export default {
  name: 'VectorsInput',

  props: {
    vectors: {
      type: Array,
      default: () => [[]],
    },

    validators: {
      type: Array,
      default: () => [[]],
    },

    attempt: {
      type: Boolean,
      default: false,
    },
  },
};
