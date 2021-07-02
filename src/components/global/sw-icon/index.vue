<template>
  <svg
    v-bind="$attrs"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    class="sw-icon"
    v-on="$listeners"
  >
    <slot />
  </svg>
</template>

<script src="./index.js"></script>

<style
  src="./index.unscoped.styl"
  lang="stylus"
></style>
