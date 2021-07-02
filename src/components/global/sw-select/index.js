import Fuse from 'fuse.js';
import get from 'lodash/get';
import throttle from 'lodash/throttle';

import { safeNoHtml } from '@/services/safe';
import { scrollToElem } from '@/utils/scroll';

import components from './components';

const NATIVE_BREAKPOINT = 768;
const isUndefinedOrNull = v => v === null || v === undefined;

/**
 * @typedef SubOption
 * @type {object}
 * @property {number} [id] - uniq id of sublist elem
 * @property {string} [label] - displaying text of elem
 * @property {string} [searchKey] - prop for text search
 * @property {string} [icon] - url of option icon
 * @property {boolean} disabled
 *
 * @typedef Option
 * @type {object}
 * @property {number} [id] - uniq id of elem
 * @property {string} [label] - displaying text of elem
 * @property {string} [searchKey] - prop for text search
 * @property {string} [icon] - url of option icon
 * @property {boolean} disabled
 * @property {boolean} delimiter
 * @property {SubOption[]} [sublist] - sublist elems
 */

/**
 * `SwSelect` Кастомизируемый селект с доп. функционалом
 */
export default {
  components,

  props: {
    value: {
      required: true,
    },

    /**
     * Select items
     *
     * @type {Option[]}
     */
    options: {
      type: Array,
      required: true,
    },

    /**
     * Use `trackBy` prop as `value`
     */
    isPropValue: {
      type: Boolean,
      default: false,
    },

    /**
     * Prop key for options list and `isPropValue`
     */
    trackBy: {
      type: [String, Function],
      default: 'id',
    },

    /**
     * Prop name for searching
     */
    searchKeys: {
      type: String,
      default: 'name',
    },

    /**
     * Prop name for display text
     */
    label: {
      type: String,
      default: 'label',
    },

    /**
     * Prop name for display icon
     */
    optionIcon: {
      default: null,
    },

    /**
     * Prop name for display selected text (default the same as `label`)
     */
    selectedLabel: {
      type: String,
      default() {
        return this.label;
      },
    },

    validator: {
      type: Object,
      default: () => ({}),
    },

    showValidation: Boolean,

    validationTextColor: String,

    placeholder: String,

    /**
     * Can select empty value (placeholder)
     */
    canBeEmpty: Boolean,

    disabled: Boolean,

    readonly: Boolean,

    /**
     * Enable text search in select
     */
    searchable: Boolean,

    /**
     * Enable multi-leveling (require `subListLabel`)
     */
    multilevel: Boolean,

    /**
     * Prop name for sublist options array
     */
    subListLabel: String,
  },

  data: () => ({
    searchText: '',
    // keyboardSelected: null,
    nativeSelect: process.client && window.innerWidth <= NATIVE_BREAKPOINT,
    dropdownOpened: false,
  }),

  computed: {
    compValue: {
      get() {
        return this.activeId;
      },
      set(newVal) {
        let value = null;

        if (!isUndefinedOrNull(newVal)) {
          if (this.isPropValue) {
            value = newVal;
          } else {
            const option = this.getOption(newVal);

            value = option && option.option;
          }
        }

        this.$emit('input', value);
        this.searchText = '';
        this.dropdownOpened = false;
      },
    },

    formattedValue() {
      return this.getOption(this.activeId);
    },

    activeId() {
      if (isUndefinedOrNull(this.value)) return null;

      return this.isPropValue
        ? this.value
        : this.getOptionId(this.value);
    },

    formattedOptions() {
      return this.options.map(this.formatOption);
    },

    expandedSubOptions() {
      return this.formattedOptions
        .reduce((acc, { sublist }) => acc.concat(sublist), []);
    },

    showNativeSelect() {
      return this.nativeSelect && !this.searchable;
    },

    inputText() {
      if (this.dropdownOpened && this.searchable) return this.searchText;

      return this.formattedValue
        ? this.formattedValue.option[this.selectedLabel]
        : '';
    },

    selectedIcon() {
      return this.formattedValue
        ? this.formattedValue.icon
        : null;
    },

    optionsFuse() {
      const searchKeyPrefix = this.multilevel
        ? 'sublist.option'
        : 'option';

      return new Fuse(this.formattedOptions, {
        keys: [`${searchKeyPrefix}.${this.searchKeys}`],
        threshold: 0.3,
      });
    },

    subOptionsFuse() {
      return new Fuse(this.expandedSubOptions, {
        keys: [`option.${this.searchKeys}`],
        threshold: 0.6,
      });
    },

    filteredOptions() {
      if (!this.searchText) return this.formattedOptions;

      const options = this.optionsFuse.search(this.searchText);

      if (!this.multilevel) return options;

      return options.map(({ sublist, ...etc }) => ({
        ...etc,
        sublist: sublist
          .filter((subOption) =>
            this.filteredSubOptions.includes(subOption)
          ),
      }));
    },

    filteredSubOptions() {
      return this.searchText
        ? this.subOptionsFuse.search(this.searchText)
        : this.expandedSubOptions;
    },

    isDisabled() {
      if (!this.options) return;

      return this.disabled || this.options.length === 0;
    },

    inputSize() {
      return this.inputText
        ? this.inputText.length
        : 20;
    },

    className() {
      return {
        opened: this.dropdownOpened,
        disabled: this.isDisabled,
        'with-icon': this.optionIcon && this.selectedIcon && !this.dropdownOpened,
      };
    },
  },

  methods: {
    onInputText: throttle(function({ target: { value } }) {
      this.searchText = value;
    }, 100),

    openDropdown() {
      if (this.readonly) return;
      this.dropdownOpened = true;
    },

    closeDropdown() {
      this.dropdownOpened = false;
    },

    toggleDropdown() {
      if (this.readonly) return;
      if (this.dropdownOpened) {
        this.$refs.input && this.$refs.input.blur();
      } else if (this.showNativeSelect) {
        scrollToElem(this.$el, { behavior: 'smooth' });
      }
      this.dropdownOpened = !this.dropdownOpened;
    },

    formatOption(option) {
      const id = this.getOptionId(option);
      const label = safeNoHtml(option[this.label]);
      const icon = option[this.optionIcon] || null;
      const isActive = this.activeId === id;
      const isDisabled = option.disabled;
      const optionClass = { active: isActive, disabled: isDisabled };
      const isDelimiter = option.delimiter;
      const sublist = (option[this.subListLabel] || [])
        .map(this.formatSublistOption);

      return {
        id,
        label,
        icon,
        isActive,
        isDisabled,
        class: optionClass,
        isDelimiter,
        sublist,
        option,
      };
    },

    formatSublistOption(option) {
      const id = this.getOptionId(option);
      const label = safeNoHtml(option[this.label]);
      const icon = option[this.optionIcon] || null;
      const isActive = this.activeId === id;
      const isDisabled = option.disabled;
      const optionClass = { active: isActive, disabled: isDisabled };

      return {
        id,
        label,
        icon,
        isActive,
        isDisabled,
        class: optionClass,
        option,
      };
    },

    getOption(optionId = null) {
      const options = this.multilevel
        ? this.expandedSubOptions
        : this.formattedOptions;

      return options
        .find(({ id }) => id === optionId);
    },

    getOptionId(option) {
      const { trackBy } = this;

      return typeof trackBy === 'function'
        ? trackBy(option)
        : get(option, trackBy);
    },
  },
};
