<template>
  <span
    class="formula"
    :class="{ [`size-${size}`]: size, scrollable }"
    v-html="rendered"
  />
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
