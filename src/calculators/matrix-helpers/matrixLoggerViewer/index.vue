<template>
  <div class="logger-viewer">
    <template v-for="step in steps">
      <div
        v-if="step.nextLine"
        :key="`${step.id}_divider`"
        class="logger-viewer__divider"
      />
      <Formula
        v-if="step.isLatex"
        :key="step.id"
        :config="{ displayMode: step.big }"
        :text="step.text"
        class="logger-viewer__formula"
      />
      <span
        v-else
        :key="step.id"
        class="logger-viewer__text"
      >
        {{ step.text }}
      </span>
    </template>
  </div>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
  scoped
></style>
