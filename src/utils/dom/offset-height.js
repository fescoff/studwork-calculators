export default el => {
  if (!el) return null;

  const height = el.offsetHeight;
  const style = window.getComputedStyle(el);
  const topSpace = parseInt(style.marginTop, 10);
  const botSpace = parseInt(style.marginBottom, 10);

  return height + topSpace + botSpace;
};
