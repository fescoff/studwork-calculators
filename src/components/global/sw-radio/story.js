import { actions } from '@storybook/addon-actions';

import disableControls from '@/.storybook/helpers/disable-controls';

import { colors } from './config';

import SwRadio from './index';

export default {
  title: 'Global/SwRadio',
  component: SwRadio,
  argTypes: {
    color: { control: { type: 'inline-radio', options: colors } },
    value: { control: 'boolean' },
    active: { control: 'boolean' },
    text: {
      name: 'text',
      description: 'Content of default slot',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Link' },
      },
    },
  },
};

export const AllProps = (args) => ({
  props: Object.keys(args),
  data: () => ({ active: false }),
  methods: actions({ onUpdate: 'update:active' }),
  template: `<div>
    <SwRadio
      :pending="pending"
      :disabled="disabled"
      :color="color"
      :active.sync="active"
      :value="true"
      @update:active="onUpdate"
    />
    <SwRadio
      :pending="pending"
      :disabled="disabled"
      :color="color"
      :active.sync="active"
      :value="false"
      @update:active="onUpdate"
    />
  </div>`,
});
AllProps.args = {
  pending: false,
  disabled: false,
};
disableControls(AllProps, ['active', 'id', 'value']);

export const WithLabel = (args) => ({
  props: Object.keys(args),
  data: () => ({ active: false }),
  methods: actions({ onUpdate: 'update:active' }),
  template: `<div>
    <SwRadio
      :pending="pending"
      :disabled="disabled"
      :color="color"
      :active.sync="active"
      :value="true"
      @update:active="onUpdate"
    >{{ text }}</SwRadio>
    <SwRadio
      :pending="pending"
      :disabled="disabled"
      :color="color"
      :active.sync="active"
      :value="false"
      @update:active="onUpdate"
    >{{ text }}</SwRadio>
  </div>`,
});
WithLabel.args = {
  text: 'Label',
  pending: false,
  disabled: false,
};
disableControls(WithLabel, ['active', 'id', 'value']);

export const Pending = (args) => ({
  props: ['text'],
  template: `<SwRadio pending>
    {{ text }}
  </SwRadio>`,
});
Pending.args = {
  text: 'Label',
};
disableControls(Pending, ['id', 'pending', 'disabled', 'color', 'active', 'value']);
