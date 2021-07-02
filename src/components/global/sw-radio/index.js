import CircleNotchIcon from '@/components/icons/regular/circle-notch';

import { colors } from './config';

export default {
  components: {
    CircleNotchIcon,
  },

  props: {
    /**
     * Custom id for input and label(if exist)
     */
    id: {
      type: String,
    },

    pending: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: 'gray',
      validator: type => colors.includes(type),
    },

    /**
     * Now active value
     */
    active: {
      type: [String, Number, Boolean],
    },

    /**
     * Value of this component
     */
    value: {
      type: [String, Number, Boolean],
    },
  },

  data() {
    return {
      itemId: this.id ? this.id : `sw-radio-${this._uid}`,
    };
  },

  computed: {
    isChecked() {
      return this.active === this.value;
    },

    isInactive() {
      return this.disabled || this.pending;
    },
  },

  methods: {
    checkRadio() {
      /**
       * Update active value
       */
      this.$emit('update:active', this.value);
    },
  },
};
