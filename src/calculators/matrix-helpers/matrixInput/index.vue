<template>
  <div class="matrix-input row">
    <Formula
      class="col matrix-input__bracket matrix-input__bracket-left"
      text="("
    />

    <div class="matrix-input__matrix">
      <div
        v-for="(row, index) in matrix"
        :key="index"
        class="matrix-input__row"
      >
        <SwInput
          v-for="(cell, index2) in row"
          :key="index2"
          :show-validation="attempt && validators[index][index2].invalid"
          :show-validation-text="false"
          :validator="validators[index][index2]"
          class="matrix-input__input"
        >
          <input
            v-model="matrix[index][index2]"
            :disabled="disabled"
            :placeholder="placeholderMethod(index2, index)"
          >
        </SwInput>
      </div>
    </div>

    <Formula
      class="col matrix-input__bracket matrix-input__bracket-right"
      text=")"
    />
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.styl" lang="stylus" scoped></style>
