export default (top = 0, left = 0, config = {}) => {
  const element = config.element || document.documentElement;
  const behavior = config.behavior || 'auto';

  if (behavior === 'auto') {
    element.scrollTop = top;
    element.scrollLeft = left;
  } else {
    element.scroll({ top, left, behavior });
  }
};
