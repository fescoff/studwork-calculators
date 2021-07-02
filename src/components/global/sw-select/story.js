import { actions } from '@storybook/addon-actions';

import SearchIcon from '@/components/icons/regular/search';

import disableControls from '@/.storybook/helpers/disable-controls';

import SwSelect from './index.vue';

export default {
  title: 'Global/SwSelect',
  component: SwSelect,
  parameters: {
    componentsSubtitle: 'Select with a lot of features',
  },
  argTypes: {
    selectedLabel: {
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'label' },
      },
    },
  },
};

const options = [
  {
    id: 0,
    label: 'Россия',
    sublist: [
      {
        id: 100,
        label: 'Москва',
      },
      {
        id: 101,
        label: 'Санкт-Петербург',
      },
    ],
  },
  {
    id: 1,
    label: 'Франция',
    sublist: [
      {
        id: 102,
        label: 'Париж',
      },
    ],
  },
  {
    id: 2,
    label: 'Германия',
    sublist: [
      {
        id: 103,
        label: 'Берлин',
      },
    ],
  },
  {
    id: 3,
    label: 'США',
    sublist: [
      {
        id: 104,
        label: 'Чикаго',
      },
    ],
  },
];

const methods = actions({ onInput: 'input' });

export const AllProps = args => ({
  components: { SearchIcon },
  props: Object.keys(args),
  data() { return { myValue: this.value }; },
  methods,
  template: `<SwSelect
    v-model="myValue"
    :options="options"
    :isPropValue="isPropValue"
    :searchKeys="searchKeys"
    :label="label"
    :optionIcon="optionIcon"
    :selectedLabel="selectedLabel"
    :placeholder="placeholder"
    :canBeEmpty="canBeEmpty"
    :disabled="disabled"
    :readonly="readonly"
    :searchable="searchable"
    :multilevel="multilevel"
    :subListLabel="subListLabel"
    @input="onInput"
  >
    <SearchIcon slot="icon" />
  </SwSelect>`,
});
AllProps.args = {
  value: null,
  options,
  isPropValue: false,
  label: 'label',
  searchKeys: 'label',
  selectedLabel: 'label',
  placeholder: 'Placeholder',
  optionIcon: null,
  canBeEmpty: false,
  disabled: false,
  readonly: false,
  searchable: false,
  multilevel: false,
  subListLabel: 'sublist',
};
disableControls(AllProps, [
  'value',
  'options',
  'trackBy',
  'validator',
  'showValidation',
  'validationTextColor',
  'subListLabel',
]);
