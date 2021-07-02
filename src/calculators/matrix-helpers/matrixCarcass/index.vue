<template>
  <div class="matrix-calculator">
    <div
      ref="source"
      class="source"
    >
      <slot name="source" />
    </div>

    <SwTransitionHeight>
      <div
        v-if="matrixInputShowed"
        ref="matrixInput"
        class="matrix-input-outer"
      >
        <div class="matrix-input">
          <slot name="matrixInput" />
        </div>
      </div>
    </SwTransitionHeight>
  </div>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
  scoped
></style>
