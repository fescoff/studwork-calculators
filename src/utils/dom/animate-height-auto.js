export const fromAuto = el => {
  el.style.height = window.getComputedStyle(el).height;

  // eslint-disable-next-line
  el.offsetHeight; // принудительная перерисовка

  el.style.height = '';
};

export const toAuto = el => {
  const handleEndTransition = () => {
    el.style.height = 'auto';
    el.removeEventListener('transitionend', handleEndTransition, false);
  };

  el.addEventListener('transitionend', handleEndTransition, false);

  const prevHeight = el.offsetHeight;
  el.style.height = 'auto';
  const endHeight = window.getComputedStyle(el).height;
  el.style.height = `${prevHeight}px`;

  // eslint-disable-next-line
  el.offsetHeight; // принудительная перерисовка

  el.style.height = endHeight;
};

export default { fromAuto, toAuto };
