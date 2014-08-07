var exec = require('child_process').exec;
var Q = require('q');
var fs = require('fs');
var _ = require('underscore');

var utils = require('./utils');
var cache = {};

module.exports = function (browser) {
  var name = browser.name;

  if (!cache[name]) {
    cache[name] = Q(_.clone(browser)).then(function (current) {
      if (current.noCheck) {
        return current;
      }

      // Check in default location first
      if (browser.defaultLocation && fs.existsSync(browser.defaultLocation)) {
        current.path = browser.defaultLocation;
        return current;
      }

      // Run the pathQuery to see if we can find it somewhere else
      return Q.nfcall(exec, current.pathQuery, {
        cwd: current.cwd || '.'
      }).then(function (stdout) {
        var path;
        if (current.pathRE) {
          var match = current.pathRE.exec(stdout);
          if (match) {
            path = match[1];
          }
        } else {
          path = utils.getStdout(stdout);
        }

        if (!path) {
          return null;
        }

        // Set path
        current.path = path;
        return current;
      }, function() {
        // Exec errors most likely mean the browser doesn't exist
        return null;
      });
    }).then(function (current) {
      if (current !== null) {
        // Set the command to the path
        if (!current.command) {
          current.command = current.path;
        } else if (current.command === 'open') {
          // Set the arguments for the open process
          current.args = current.openArgs.concat([current.path], current.args || []);
        }
      }

      return current;
    }, function(error) {
      console.error("ERROR:" + error);
    });
  }

  return cache[name];
};
