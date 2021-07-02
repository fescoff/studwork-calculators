// Это решение каким-то чудом блокирует скролл на iOS у document
// через disable и влючает скролл у элемента через enable, оригинал:
// https://stackoverflow.com/questions/12639888/disable-overscroll-in-ios-safari
// костыли через fixed body и overflow: hidden не работают как надо

const preventDefault = e => e.preventDefault();
const stopPropagation = e => e.stopPropagation();
const touchStartMagic = e => {
  if (e.currentTarget.scrollTop === 0) {
    e.currentTarget.scrollTop = 1;
  } else if (
    e.currentTarget.scrollHeight ===
    e.currentTarget.scrollTop + e.currentTarget.offsetHeight
  ) {
    e.currentTarget.scrollTop -= 1;
  }
};

const enable = $el => {
  $el.addEventListener('touchstart', touchStartMagic, false);
  $el.addEventListener('touchmove', stopPropagation, false);
  return () => {
    $el.removeEventListener('touchstart', touchStartMagic, false);
    $el.removeEventListener('touchmove', stopPropagation, false);
  };
};

const disable = $el => {
  $el.addEventListener('touchmove', preventDefault, false);
  return () => $el.removeEventListener('touchmove', preventDefault, false);
};

export const iosScroll = { enable, disable };
