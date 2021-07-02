<template>
  <TransitionGroup
    v-if="group"
    name="transition-height-group"
    v-bind="$attrs"
    v-on="listeners"
  >
    <slot />
  </TransitionGroup>

  <Transition
    v-else
    name="transition-height"
    v-bind="$attrs"
    v-on="listeners"
  >
    <slot />
  </Transition>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
></style>
