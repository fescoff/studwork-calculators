import CircleNotchIcon from '@/components/icons/regular/circle-notch';
import CheckIcon from '@/components/icons/regular/check';

export default {
  components: {
    CircleNotchIcon,
    CheckIcon,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    pending: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isChecked() {
      return this.value;
    },

    isInactive() {
      return this.disabled || this.pending;
    },

    isContentExists() {
      return Boolean(this.$slots.default);
    },
  },

  methods: {
    toggle() {
      /**
       * Update of v-model
       */
      this.$emit('input', !this.value);
    },
  },
};
