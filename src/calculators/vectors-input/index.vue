<template>
  <div class="vectors-input">
    <div class="vectors-input__row">
      <div class="vectors-input__placeholder">
        i
      </div>

      <div class="vectors-input__placeholder">
        j
      </div>

      <div class="vectors-input__placeholder">
        k
      </div>
    </div>

    <div
      v-for="(row, index) in vectors"
      :key="index"
      class="vectors-input__row"
    >
      <SwInput
        v-for="(cell, index2) in row"
        :key="index2"
        :show-validation="attempt && validators[index][index2].invalid"
        :show-validation-text="false"
        :validator="validators[index][index2]"
        class="vectors-input__input"
      >
        <input v-model="vectors[index][index2]">
      </SwInput>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
  scoped
></style>
