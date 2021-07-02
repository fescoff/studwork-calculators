import Formula from '../../formula';

export default {
  name: 'MatrixInput',

  components: {
    Formula,
  },

  props: {
    square: {
      type: Boolean,
      default: false,
    },

    matrix: {
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

    placeholder: {
      type: [String, Function],
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    rows() {
      return this.matrix.length;
    },

    cols() {
      return this.rows ? this.matrix[0].length : 0;
    },
  },

  methods: {
    placeholderMethod(x, y) {
      if (typeof this.placeholder === 'function') return this.placeholder(x, y);
      return this.placeholder;
    },
  },
};
