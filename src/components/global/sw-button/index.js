import URL from 'url-parse';

import CircleNotchIcon from '@/components/icons/regular/circle-notch';

import { colors, sizes, iconPositions } from './config';

const isDev = process.env.SW_STAGE === 'local';

export default {
  components: {
    CircleNotchIcon,
  },

  props: {
    tag: String,
    href: String,
    newTab: Boolean,
    away: Boolean,

    bold: {
      type: Boolean,
      default: true,
    },

    color: {
      type: String,
      default: 'gray',
      validate: item => colors.includes(item),
    },

    size: {
      type: String,
      default: 'medium',
      validate: item => sizes.includes(item),
    },

    type: {
      type: String,
      default: 'button',
    },

    pending: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },

    iconPosition: {
      type: String,
      default: 'left',
      validator: val => iconPositions.includes(val),
    },

    // vue-wait id
    wait: String,
  },

  computed: {
    isIconExist() {
      return Boolean(this.$slots.icon);
    },

    isLeftIcon() {
      return this.iconPosition === 'left';
    },

    isRightIcon() {
      return this.iconPosition === 'right';
    },

    compType() {
      if (this.component === 'button') {
        return this.type;
      }

      return null;
    },

    component() {
      if (this.tag) return this.tag;
      if (this.href) {
        if (this.away || this.isAbsolutePath || (this.newTab && !isDev) || !this.isHttp)
          return 'a';
        return 'nuxt-link';
      }
      return 'button';
    },

    isHttp() {
      const { protocol } = new URL(this.href, process.env.SW_BASE_URL);

      return protocol === 'http:' || protocol === 'https:';
    },

    isAbsolutePath() {
      return /https?:\/\//.test(this.href);
    },

    link() {
      if (!this.href) return undefined;

      return this.href;
    },

    linkOptions() {
      const options = {};

      switch (this.component) {
        case 'a':
          options.href = this.link;
          if (this.newTab && !isDev) options.target = '_blank';
          if (this.away) options.rel = 'noopener noreferrer';
          break;

        case 'nuxt-link':
          options.to = this.link;
          break;
      }

      return options;
    },

    hasContent() {
      const { default: slot = null } = this.$slots || {};
      return !!slot;
    },

    isColored() {
      return this.color !== 'none';
    },

    isSized() {
      return this.size !== 'none';
    },

    isWaiting() {
      return this.wait && this.$wait.is(this.wait);
    },

    isPending() {
      return this.isWaiting || this.pending;
    },

    isDisabled() {
      return this.isPending || this.disabled;
    },
  },
};
