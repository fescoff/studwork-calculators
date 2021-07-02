import URL from 'url-parse';

const isDev = process.env.SW_STAGE === 'local';

export default {
  name: 'SwLink',

  props: {
    /**
     * Url for link
     */
    href: String,

    /**
     * Force `a` tag
     */
    away: {
      type: Boolean,
      default: false,
    },

    /**
     * Open in new tab
     */
    newTab: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Classname for nuxt-link
     */
    activeClass: {
      type: String,
    },

    /**
     * Add default styles
     */
    styled: {
      type: Boolean,
      default: true,
    },

    /**
     * Nuxt link exact
     */
    exact: {
      type: Boolean,
      default: false,
    },

    /**
     * rel=nofollow
     */
    noFollow: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    componentName() {
      if (!this.href) return 'button';

      if (this.isAbsolutePath || !this.isHttp || this.away) return 'a';

      return 'nuxt-link';
    },

    componentOptions() {
      const options = {
        disabled: this.disabled,
        exact: this.exact,
      };

      if (this.componentName === 'button') {
        options.type = 'button';
      } else {
        const linkAttr = this.componentName === 'a' ? 'href' : 'to';
        options[linkAttr] = this.link;
        if (this.linkRel) options.rel = this.linkRel;
        if (this.activeClass) {
          options['active-class'] = this.activeClass;
          options['exact-active-class'] = this.activeClass;
        }
        if (this.newTab && !isDev) options.target = '_blank';
      }

      return options;
    },

    link() {
      return this.href;
    },

    isHttp() {
      const { protocol } = new URL(this.href, process.env.SW_BASE_URL);

      return protocol === 'http:' || protocol === 'https:';
    },

    isAbsolutePath() {
      return /https?:\/\//.test(this.href);
    },

    linkRel() {
      const rel = [];

      if (this.noFollow) rel.push('nofollow');
      if (this.away) rel.push('noopener', 'noreferrer');

      return rel.join(' ');
    },
  },
};
