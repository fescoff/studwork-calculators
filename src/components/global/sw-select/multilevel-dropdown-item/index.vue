<template>
  <div class="multilevel-dropdown-item">
    <span class="multilevel-dropdown-item__label">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="option.label" />
    </span>

    <label
      v-for="subOption in option.sublist"
      :key="subOption.id"
      class="item multilevel-dropdown-item__item"
      :class="subOption.class"
    >
      <input
        v-model="compValue"
        :value="subOption.id"
        :disabled="subOption.isDisabled"
        type="radio"
        class="item__check"
      >

      <template v-if="subOption.icon">
        <SwImg
          :src="subOption.icon"
          class="item__icon"
          width="25"
          height="25"
        />
      </template>

      <span>{{ subOption.label }}</span>
    </label>
  </div>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
  scoped
></style>
