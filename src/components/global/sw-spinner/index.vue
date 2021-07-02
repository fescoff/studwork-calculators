<template>
  <div
    class="sw-spinner"
    :style="styles"
  >
    <div
      class="spinner"
      :class="[ size ]"
    >
      <div class="dot1" />
      <div class="dot2" />
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
></style>
