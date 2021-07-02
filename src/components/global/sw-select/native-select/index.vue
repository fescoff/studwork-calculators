<template>
  <select
    v-model="compValue"
    class="native-select"
    :class="{
      placeholder: !value
    }"
    :disabled="disabled"
    :readonly="readonly"
  >
    <option
      v-if="placeholder"
      :value="null"
      :selected="!value"
      :disabled="!canBeEmpty"
    >
      {{ placeholder }}
    </option>

    <template v-for="(option, index) in options">
      <optgroup
        v-if="multilevel"
        :key="option.id"
        :label="option.label"
      >
        <option
          v-for="subOption in option.sublist"
          :key="subOption.id"
          :value="subOption.id"
          v-html="subOption.label"
        />
      </optgroup>

      <template v-else>
        <option
          v-if="option.isDelimiter"
          :key="`delimiter-${index}`"
          value="------------------------------"
          :disabled="true"
        />

        <option
          v-else
          :key="option.id"
          :value="option.id"
          :disabled="option.isDisabled"
          v-html="option.label"
        />
      </template>
    </template>
  </select>
</template>

<script src="./index.js"></script>

<style
  src="./index.styl"
  lang="stylus"
  scoped
></style>
