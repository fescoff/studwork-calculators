export default {
  props: {
    value: [Number, String],
    showValidation: {
      type: Boolean,
      required: true,
    },
    validator: {
      type: Object,
      requried: true,
    },
    validationTooltip: {
      type: Boolean,
      default: true,
    },
    validationTooltipConfig: {
      type: Object,
      default: () => ({
        theme: 'red',
      }),
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
};
