<template>
  <div
    class="sw-select"
    :class="className"
    v-click-outside="closeDropdown"
  >
    <SwInput
      tag="label"
      :show-validation="showValidation"
      :show-validation-icons="false"
      :validator="validator"
      :validation-text-color="validationTextColor"
    >
      <template
        v-if="$slots.icon"
        #icon
      >
        <!-- @slot Icon slot -->
        <slot name="icon" />
      </template>

      <NativeSelect
        v-model="compValue"
        v-show="showNativeSelect"
        :options="filteredOptions"
        :placeholder="placeholder"
        :multilevel="multilevel"
        :disabled="isDisabled"
        :readonly="readonly"
        :can-be-empty="canBeEmpty"
        class="sw-select__native-select"
      />

      <input
        ref="input"
        :value="inputText"
        :readonly="readonly || !searchable || showNativeSelect"
        :size="inputSize"
        :disabled="isDisabled"
        :placeholder="placeholder"
        type="text"
        class="input"
        @input="onInputText"
        @click="toggleDropdown"
      >

      <SwImg
        v-if="optionIcon && selectedIcon && !dropdownOpened"
        :src="selectedIcon"
        class="item__icon img"
        width="25"
        height="25"
      />

      <AngleUpIcon
        v-if="dropdownOpened"
        class="arrow-icon"
      />

      <AngleDownIcon
        v-else
        class="arrow-icon"
      />

      <div
        v-show="!showNativeSelect && dropdownOpened"
        class="dropdown"
      >
        <div
          v-show="searchText && filteredOptions.length === 0"
          class="no-results"
        >
          Не найдено
        </div>

        <label
          v-if="placeholder && canBeEmpty"
          v-show="!searchText && formattedValue"
          class="item disabled"
        >
          <input
            v-model="compValue"
            :value="null"
            type="radio"
            class="item__check"
          >
          <span class="item__label">{{ placeholder }}</span>
        </label>

        <template v-if="multilevel">
          <MultilevelDropdownItem
            v-model="compValue"
            v-for="option in filteredOptions"
            :key="option.id"
            :option="option"
          />
        </template>

        <template v-else>
          <SimpleDropdownItem
            v-model="compValue"
            v-for="option in filteredOptions"
            :key="option.id"
            :option="option"
          />
        </template>
      </div>
    </SwInput>
  </div>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
  scoped
></style>

<style
  src="./index.unscoped.styl"
  lang="stylus"
></style>
