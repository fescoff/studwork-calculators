import Vue from 'vue';

const ERROR_CLASSNAME = 'sw-input_invalid';

const isVisible = element =>
  element.offsetWidth > 0 && element.offsetHeight > 0;

export default (el = document.documentElement) => {
  setTimeout(() => {
    Vue.nextTick(() => {
      const inputs = el.querySelectorAll(`
        .${ERROR_CLASSNAME} input,
        .${ERROR_CLASSNAME} textarea`);
      const arrayInputs = Array.from(inputs);
      const visibleInputs = arrayInputs.filter(isVisible);

      if (visibleInputs[0]) visibleInputs[0].focus();
    });
  }, 10);
};
