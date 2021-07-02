const FILL_WHITE = 'white';
const FILL_GRAY = 'gray';
const FILL_BLUE = 'blue';

export default {
  props: {
    fill: {
      type: String,
      validator: val => val === null || [FILL_WHITE, FILL_GRAY, FILL_BLUE].includes(val),
    },
  },
};
