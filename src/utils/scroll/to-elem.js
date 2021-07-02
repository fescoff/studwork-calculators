import scrollparent from 'scrollparent';

export default (el, config = {}) => {
  if (!el) return;
  const closestScrollableEl = scrollparent(el);
  const behavior = config.behavior || 'auto';
  const topPadding = config.top || 0;
  const top = el.offsetTop - topPadding;
  closestScrollableEl.scroll({ top, left: 0, behavior });
};
