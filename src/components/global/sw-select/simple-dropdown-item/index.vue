<template>
  <div>
    <label
      v-if="option.isDelimiter"
      class="item__delimiter"
    />

    <label
      v-else
      class="item"
      :class="option.class"
    >
      <input
        v-model="compValue"
        :value="option.id"
        :disabled="option.isDisabled"
        type="radio"
        class="item__check"
      >

      <template v-if="option.icon">
        <SwImg
          :src="option.icon"
          class="item__icon"
          width="25"
          height="25"
        />
      </template>

      <span class="item__label">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="option.label" />
      </span>
    </label>
  </div>
</template>

<script src="./index.js"></script>
