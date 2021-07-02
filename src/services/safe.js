import truncate from 'lodash/truncate';
import xss from 'xss';
import escape from 'lodash/escape';
import unEscape from 'lodash/unescape';

import { linkify } from '@/services/linkify';
import emojify from '@/services/emojify';

export const safeNumberAsString = num => `${num}`.replace(/[^0-9]/gi, '');
export const safeNumber = num => {
  const stringNumber = `${num}`.replace(/[^0-9]/gi, '');
  return stringNumber.length ? Number(stringNumber) : undefined;
};

export const nl2br = (text = '') =>
  text
    .trim()
    .replace(/([^>])\n+/gm, '$1<br>')
    .replace(/<br ?\/?>/gm, '<br>')
    .replace(/<br>\s*<br>/gm, '<br><br>')
    .replace(/(<br>){3,}/gm, '<br><br>');
export const safeText = (text = '') => unEscape(text);
export const safeHtmlAsText = (html = '') => escape(safeText(html));
export const safeNoHtml = (html = '') => html.replace(/<[^>]+>/gi, '');
export const safeHtml = (html = '', xssWhitelist = null, xssConfig = {}) => {
  const options = {
    whiteList: {
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      em: [],
      p: [],
      br: [],
      strong: [],
      ol: [],
      ul: [],
      li: [],
      blockquote: [],
      img: ['src', 'alt', 'width', 'height'],
      iframe: ['class', 'src', 'frameborder', 'allowfullscreen'],
      a: ['href', 'title', 'target', 'rel'],

      // Формула
      span: ['class', 'data-value', 'aria-hidden', 'style'],
      math: [],
      semantics: [],
      mrow: [],
      mi: [],
      mo: ['fence'],
      msup: [],
      msub: [],
      mn: [],
      annotation: ['encoding'],

      // События
      div: ['class'],

      // Тесты
      test: ['test-id', 'type'],
    },
    ...xssConfig,
  };

  if (xssWhitelist) options.whiteList = xssWhitelist;

  return xss(html, options);
};

/**
 * @param {String} [text='']
 * @param {Object} [opts={}]
 * @param {Object|null} [opts.xssWhitelist=null]
 * @param {Boolean} [opts.links=false]
 * @param {Boolean} [opts.emoji=false]
 * @param {Object} [opts.truncate=false] lodash.truncate
 * @returns {string}
 */
export const usersHtml = (text = '', opts = {}) => {
  const {
    xssWhitelist = null,
    links = false,
    emoji = false,
    truncate: truncateOpts = false,
  } = opts;

  let result = text;
  result = nl2br(result);
  // result = result
  //   .replace(/(<p>\s*<br>\s*<\/p>)+/g, '<p><br></p>')
  //   .replace(/((^<p>\s*<br>\s*<\/p>)|(<p>\s*<br>\s*<\/p>$))/, '');
  result = safeHtml(result, xssWhitelist);
  result = unescapeFavoriteChars(result);
  result = !truncateOpts ? result : truncate(result, truncateOpts);
  result = links ? linkify(result) : result;
  result = emoji ? emojify(result) : result;

  return result;
};

/**
 * @param {String} [text='']
 * @param {Object} [opts={}]
 * @param {Boolean} [opts.htmlAsText=false]
 * @param {Boolean} [opts.links=false]
 * @param {Boolean} [opts.emoji=false]
 * @param {Object} [opts.truncate=false] lodash.truncate
 * @returns {string}
 */
export const usersText = (text = '', opts = {}) => {
  const {
    htmlAsText = false,
    links = false,
    emoji = false,
    truncate: truncateOpts = false,
  } = opts;

  let result = text;
  // result = result
  //   .replace(/(<p>\s*<br>\s*<\/p>)+/g, '<p><br></p>')
  //   .replace(/((^<p>\s*<br>\s*<\/p>)|(<p>\s*<br>\s*<\/p>$))/, '');
  result = htmlAsText ? safeHtmlAsText(result) : safeNoHtml(result);
  result = unescapeFavoriteChars(result);
  result = !truncateOpts ? result : truncate(result, truncateOpts);
  result = nl2br(result);
  result = links ? linkify(result) : result;
  result = emoji ? emojify(result) : result;

  return result;
};

export function unescapeFavoriteChars(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#10005;/gi, '✕');
}

export const escapeRegexp = text => text.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
