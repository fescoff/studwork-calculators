import disableControls from '@/.storybook/helpers/disable-controls';

import SwPane from './index';

export default {
  title: 'Global/SwPane',
  component: SwPane,
};

export const Default = (args) => ({
  props: ['text'],
  template: `<SwPane>
    {{ text }}
  </SwPane>`,
});
Default.args = {
  text: 'Some content',
};
disableControls(Default, ['theme', 'size']);
