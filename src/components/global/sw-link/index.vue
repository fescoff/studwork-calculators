<template>
  <Component
    :is="componentName"
    v-bind="componentOptions"
    class="sw-link"
    :class="{
      'sw-link_styled': styled,
    }"
  >
    <!-- @slot Link content -->
    <slot />
  </Component>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
></style>
