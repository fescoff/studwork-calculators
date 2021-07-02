<template>
  <div
    class="sw-container"
    :class="{
      [`sw-container_fill-${fill}`]: fill,
    }"
  >
    <div class="sw-container__content">
      <slot />
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
  scoped
></style>

<style
  src="./fill.styl"
  lang="stylus"
  scoped
></style>
