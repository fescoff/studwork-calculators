const forceRepaint = el => el.offsetHeight;

const setSensitiveParams = (el, newVal) => {
  [
    'opacity',
    'marginTop',
    'marginBottom',
    'paddingTop',
    'paddingBottom',
    'borderTopWidth',
    'borderBottomWidth',
  ].forEach(k => (el.style[k] = newVal));
};

export default {
  get: () => ({
    beforeEnter(el) {
      setSensitiveParams(el, 0);
    },

    enter(el) {
      const width = getComputedStyle(el).width;
      el.style.width = width;
      el.style.position = 'absolute';
      el.style.visibility = 'hidden';
      el.style.height = 'auto';
      const height = forceRepaint(el);
      el.style.width = null;
      el.style.position = null;
      el.style.visibility = null;
      el.style.height = 0;

      requestAnimationFrame(() => {
        el.style.height = `${height}px`;
        forceRepaint(el);
        setSensitiveParams(el, null);
        forceRepaint(el);
      });
    },

    afterEnter(el) {
      el.style.height = null;
    },

    leave(el) {
      el.style.height = `${el.offsetHeight}px`;
      requestAnimationFrame(() => {
        forceRepaint(el);
        setSensitiveParams(el, 0);
        el.style.height = 0;
      });
    },

    afterLeave(el) {
      setSensitiveParams(el, null);
      el.style.height = null;
    },
  }),

  set: () => {},
};
