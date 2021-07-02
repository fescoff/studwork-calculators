<template>
  <Component
    :is="component"
    :disabled="isDisabled"
    :type="compType"
    :class="{
      'sw-button_bold': bold,
      [`sw-button_${size}`]: isSized,
      [`sw-button_${color}`]: isColored,
      'sw-button_empty': !hasContent,
    }"
    class="sw-button"
    v-bind="linkOptions"
    v-on="$listeners"
  >
    <span
      v-if="isLeftIcon && (isPending || isIconExist)"
      class="sw-button__icon sw-button__icon_left"
    >
      <CircleNotchIcon
        v-if="isPending"
        class="sw-button__rotate"
      />

      <slot
        v-else
        name="icon"
      />
    </span>

    <slot />

    <span
      v-if="isRightIcon && (isPending || isIconExist)"
      class="sw-button__icon sw-button__icon_right"
    >
      <CircleNotchIcon
        v-if="isPending"
        class="sw-button__rotate"
      />

      <slot
        v-else
        name="icon"
      />
    </span>
  </Component>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
></style>
