<template>
  <Component
    :is="tag"
    :icon-position="iconPosition"
    :validation-icons-position="validationIconsPosition"
    class="sw-input"
    :class="{
      'sw-input_valid': showValidation && !validator.invalid,
      'sw-input_invalid': showValidation && validator.invalid,
      'sw-input_icon-left': isIconExist && isIconLeft,
      'sw-input_icon-right': (isIconExist && isIconRight) || isValidIconShown || isInvalidIconShown,
    }"
  >
    <div
      v-if="title"
      class="title-block"
    >
      <p class="title">{{ title }}</p>

      <p
        v-show="subTitle"
        class="sub-title"
      >
        {{ subTitle }}
      </p>
    </div>

    <div v-bind="validationTooltipConfig">
      <div class="sw-input__container">
        <span
          v-if="isIconExist && isIconLeft"
          tabindex="-1"
          class="sw-input__icon sw-input__icon_left"
        >
          <slot name="icon" />
        </span>

        <slot />

        <CheckIcon
          v-if="isValidIconShown"
          type="check"
          class="sw-input__icon sw-input__icon_right sw-input__icon_green"
        />

        <TimesIcon
          v-else-if="isInvalidIconShown"
          type="times"
          class="sw-input__icon sw-input__icon_right sw-input__icon_red"
        />

        <span
          v-else-if="isIconExist && isIconRight"
          tabindex="-1"
          class="sw-input__icon sw-input__icon_right"
        >
          <slot name="icon" />
        </span>
      </div>
    </div>

    <SwTransitionHeight v-if="!validationTooltip">
      <div v-show="validator.invalid && showValidation && showValidationText">
        <div
          slot="errors"
          class="sw-input__errors"
          :class="{
            [`sw-input__errors_${validationTextColor}`]: validationTextColor,
            [`sw-input__errors_${validationTextAlign}`]: validationTextAlign,
          }"
        >
          {{ validator.message || validator.errorMessage }}
        </div>
      </div>
    </SwTransitionHeight>
  </Component>
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
