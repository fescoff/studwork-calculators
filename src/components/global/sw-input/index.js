import CheckIcon from '@/components/icons/regular/check';
import TimesIcon from '@/components/icons/regular/times';

export default {
  components: {
    CheckIcon,
    TimesIcon,
  },

  props: {
    title: String,

    subTitle: String,

    iconPosition: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right'].includes(value),
    },

    showValidation: Boolean,

    showValidationIcons: {
      type: Boolean,
      default: true,
    },

    showValidationText: {
      type: Boolean,
      default: true,
    },

    validationTextColor: {
      type: String,
      default: 'red',
    },

    tag: {
      type: String,
      default: 'div',
    },

    validator: {
      type: Object,
      default: () => ({}),
    },

    validationIconsPosition: {
      type: String,
      default: 'middle',
      validator: value => ['top', 'middle', 'bottom'].includes(value),
    },

    validationTextAlign: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right', 'center'].includes(value),
    },

    validationTooltip: Boolean,

    validationTooltipConfig: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    isIconExist() {
      return Boolean(this.$slots.icon);
    },

    isIconLeft() {
      return this.iconPosition === 'left';
    },

    isIconRight() {
      return this.iconPosition === 'right';
    },

    isValidIconShown() {
      return this.showValidation && this.showValidationIcons && !this.validator.invalid;
    },

    isInvalidIconShown() {
      return this.showValidation && this.showValidationIcons && this.validator.invalid;
    },

    rootClasses() {
      return {
        invalid: this.validator.invalid && this.showValidation,
        valid: !this.validator.invalid && this.showValidation,
        'has-icon': this.icon || this.isIconExist,
      };
    },
  },
};
