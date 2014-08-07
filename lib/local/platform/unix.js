var path = require('path');

module.exports = {
  default: {
    command: 'xdg-open',
    noCheck: true,
  },
  chrome: {
    pathQuery: 'which google-chrome',
  },
  firefox: {
    pathQuery: 'which firefox',
  },
  opera: {
    pathQuery: 'which opera',
  },
};
