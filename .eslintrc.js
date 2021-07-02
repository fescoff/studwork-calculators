// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    // 'jest/globals': true,
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  extends: ['eslint:recommended', '@vue/prettier'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'nuxt/no-cjs-in-config': 'off',
    camelcase: 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'comma-dangle': ['warn', 'always-multiline'],
    semi: ['warn', 'always'],
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
      },
    ],
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
        allowEmptyLines: false,
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
      },
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        selfClosingTag: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION', // is
          'LIST_RENDERING', // v-for
          'CONDITIONALS', // v-if, v-else-if, v-else, v-show, v-cloak
          'RENDER_MODIFIERS', // v-pre, v-once
          'GLOBAL', // id
          'UNIQUE', // ref, key, slot
          'BINDING', // v-model
          'OTHER_ATTR', // all unspecified bound & unbound attributes
          'OTHER_DIRECTIVES', // custom directives
          'EVENTS', // v-on
          'CONTENT', // v-html, v-text
        ],
      },
    ],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
  },
};
