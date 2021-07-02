import { actions } from '@storybook/addon-actions';

import SwCheck from './index.vue';

export default {
  title: 'Global/SwCheck',
  component: SwCheck,
};

const methods = actions({ onInput: 'input' });

export const AllProps = (args) => ({
  props: Object.keys(args),
  // For table(table rerender component)
  data() { return { myValue: this.value }; },
  // For normal controls
  watch: {
    value(n) { this.myValue = n; },
  },
  methods,
  template: `<SwCheck
    v-model="myValue"
    :pending="pending"
    :disabled="disabled"
    @input="onInput"
  />`,
});
AllProps.args = {
  value: false,
  pending: false,
  disabled: false,
};

export const WithLabel = (args) => ({
  props: Object.keys(args),
  data() { return { myValue: this.value }; },
  watch: {
    value(n) { this.myValue = n; },
  },
  methods,
  template: `<SwCheck
    v-model="myValue"
    :pending="pending"
    :disabled="disabled"
    @input="onInput"
  >
    {{ text }}
  </SwCheck>`,
});
WithLabel.args = {
  text: 'Label',
  value: false,
  pending: false,
  disabled: false,
};

export const Pending = () => ({
  methods,
  template: `<SwCheck pending @input="onInput" />`,
});

export const Disabled = () => ({
  methods,
  template: `<SwCheck disabled @input="onInput" />`,
});
