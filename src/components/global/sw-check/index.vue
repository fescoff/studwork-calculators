<template>
  <Component
    :is="isContentExists ? 'label' : 'div'"
    class="sw-check"
    :class="{
      'sw-check_checked': isChecked,
      'sw-check_inactive': isInactive,
      'sw-check_content': isContentExists,
    }"
  >
    <div class="sw-check__inner">
      <input
        type="checkbox"
        :checked="isChecked"
        :disabled="isInactive"
        @click.stop="toggle"
      >

      <Transition name="fade">
        <CheckIcon
          v-show="!pending && isChecked"
          class="sw-check__icon-checked"
        />
      </Transition>

      <Transition name="fade">
        <CircleNotchIcon
          v-show="pending"
          class="sw-check__icon-pending"
        />
      </Transition>
    </div>

    <div
      v-if="isContentExists"
      class="sw-check__label"
    >
      <!-- @slot Label for check -->
      <slot />
    </div>
  </Component>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
></style>
