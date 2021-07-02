<template>
  <label class="col">
    <div class="row">
      <div class="col">
        <slot />
      </div>

      <div class="col">
        <SwInput
          :show-validation="showValidation"
          :validator="validator"
          :validation-tooltip="validationTooltip"
          :validation-tooltip-config="validationTooltipConfig"
        >
          <input
            :value="value"
            :placeholder="placeholder"
            @input="$emit('input', $event.target.value)"
          >
        </SwInput>
      </div>
    </div>
  </label>
</template>

<script src="./index.js"></script>
