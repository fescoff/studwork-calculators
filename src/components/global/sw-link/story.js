import disableControls from '@/.storybook/helpers/disable-controls';

import SwLink from './index';

SwLink.defaultProps = {
  text: 'Link',
};

export default {
  title: 'Global/SwLink',
  component: SwLink,
  argTypes: {
    text: {
      name: 'text',
      description: 'Content of default slot',
      type: 'string',
      defaultValue: 'Link',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Link' },
      },
    },
  },
};

export const AllProps = (args) => ({
  components: { SwLink },
  props: Object.keys(args),
  template: `<SwLink
    :href="href"
    :away="away"
    :newTab="newTab"
    :disabled="disabled"
    :activeClass="activeClass"
    :styled="styled"
    :exact="exact"
    :noFollow="noFollow"
  >
    {{ text }}
  </SwLink>`,
});
AllProps.args = {
  away: true,
  newTab: false,
  disabled: false,
  styled: true,
  exact: false,
  noFollow: false,
  href: '/?path=/docs/global-swlink--all-props',
};

export const Disabled = (args) => ({
  components: { SwLink },
  props: Object.keys(args),
  template: `<SwLink
    :disabled="disabled"
  >
    {{ text }}
  </SwLink>`,
});
Disabled.args = {
  disabled: true,
};
disableControls(Disabled, ['away', 'newTab', 'styled', 'exact', 'noFollow', 'href', 'activeClass']);

export const Styles = (args) => ({
  components: { SwLink },
  props: Object.keys(args),
  template: `<div>
    <div><SwLink>{{ text }}</SwLink></div>
    <div><SwLink :styled="false">{{ text }}</SwLink></div>
  </div>`,
});
disableControls(Styles, ['away', 'newTab', 'exact', 'noFollow', 'href', 'activeClass']);

export const WithoutHref = (args) => ({
  components: { SwLink },
  props: Object.keys(args),
  template: `<SwLink>
    {{ text }}
  </SwLink>`,
});
disableControls(WithoutHref, ['away', 'newTab', 'styled', 'exact', 'noFollow', 'href', 'activeClass']);
