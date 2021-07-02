import linkifyHtml from 'linkifyjs/html';

const config = {};

export const linkify = text => linkifyHtml(text, config);
