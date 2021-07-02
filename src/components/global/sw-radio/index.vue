<template>
  <label class="sw-radio">
    <div
      :color="color"
      class="btn"
      :class="{
        checked: isChecked,
        inactive: isInactive,
      }"
    >
      <input
        :id="itemId"
        :name="active"
        :checked="isChecked"
        :disabled="isInactive"
        type="radio"
        @click="checkRadio"
      >

      <Transition name="fade">
        <div
          v-show="!pending && isChecked"
          class="circle"
        />
      </Transition>

      <Transition name="fade">
        <CircleNotchIcon
          v-show="pending"
          class="pending"
        />
      </Transition>
    </div>

    <span
      v-if="$slots.default"
      class="label"
    >
      <!-- @slot Slot for label content -->
      <slot />
    </span>
  </label>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
></style>
