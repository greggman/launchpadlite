var _ = require('underscore');
var Q = require('q');

var instance = require('./instance');
var getBrowser = require('./browser');

var normalize = function(browser) {
  return _.pick(browser, 'name', 'version');
}
var platforms = {
  win32 : './platform/windows',
  darwin : './platform/macos',
  linux : './platform/unix',
  freebsd : './platform/unix',
  sunos : './platform/unix'
};
var platform = require(platforms[process.platform]);
var tmpdir = process.env.TMPDIR || process.env.TMP;
var cleanLaunch = {
  firefox: ['-no-remote', '-silent', '-p', 'launchpad-firefox'],
  opera: ['-nosession'],
  chrome: ['--no-default-browser-check', '--no-first-run', '--user-data-dir=' + tmpdir]
}

module.exports = function (settings, callback) {
  if (!callback) {
    callback = settings;
    settings = undefined;
  }

  var api = function(url, options, callback) {
    var name = options.browser;

    getBrowser(_.extend({ name: name }, platform[name])).then(function(browser) {
      if(browser === null) {
        return Q.reject(new Error('Browser ' + name + ' not available.'));
      }

      var args = browser.args || [];
      if(options.clean && cleanLaunch[name]) {
        args = args.concat(cleanLaunch[name]);
      }

      return Q.ninvoke(instance, 'start', browser.command, args.concat(url), settings, browser);
    }).nodeify(callback);
  }

  api.browsers = function(callback) {
    var deferreds = _.map(platform, function(browser, name) {
      return getBrowser(_.extend({ name: name }, browser));
    });

    Q.all(deferreds).then(function(browsers) {
      return _.map(_.compact(browsers), normalize);
    }).nodeify(callback);
  }

  _.each(platform, function(browser, name) {
    api[name] = function(url, options, callback) {
      if(!callback) {
        callback = options;
        options = {};
      }

      options.browser = name;

      return api(url, options, callback);
    }
  });

  callback(null, api);
}

module.exports.platform = platform;
