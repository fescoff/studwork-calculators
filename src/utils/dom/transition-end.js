import once from 'once';

// https://gist.github.com/Ledzz/570dbf27c523d7826814c299a86e91f6
function transitionEndEventName() {
  const el = document.createElement('div');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'otransitionend', // oTransitionEnd in very old Opera
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  let eventName = null;
  for (const name in transitions) {
    if (transitions.hasOwnProperty(name) && el.style[name] !== undefined) {
      eventName = transitions[name];
    }
  }

  el.remove();

  return eventName;
}

let EVENT_NAME;

export default (el, fn, fallbackTime) => {
  const onceFn = once(fn);

  if (typeof EVENT_NAME === 'undefined') {
    EVENT_NAME = transitionEndEventName();
  }

  if (EVENT_NAME) {
    el.addEventListener(EVENT_NAME, onceFn, false);
  } else {
    setTimeout(onceFn, fallbackTime);
  }
};
