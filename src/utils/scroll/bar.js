import getScrollbarWidth from 'scrollbarwidth';

const setRightPadding = (padding = null) => {
  const paddingRight = padding ? `${padding}px` : '';
  const menu = Array.from(document.querySelectorAll('#nav, .menu-admin'));
  [document.body, ...menu].forEach(
    element => (element.style.paddingRight = paddingRight),
  );
};

export const showScrollBar = () => {
  document.body.style.overflow = '';
  setRightPadding();
};

let scrollbarWidth;

export const hideScrollBar = () => {
  document.body.style.overflow = 'hidden';

  const { clientHeight } = document.documentElement;
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );

  if (scrollHeight > clientHeight) {
    scrollbarWidth = scrollbarWidth || getScrollbarWidth();
    setRightPadding(scrollbarWidth);
  }
};
