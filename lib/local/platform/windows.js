var os = require('os');
var path = require('path');
var programFiles = os.arch() === "x64" ? process.env["ProgramFiles(x86)"] : process.env.ProgramFiles;
var cwd = path.dirname(programFiles);
var appData = process.env.LOCALAPPDATA || process.env.APPDATA;

var getPath = path.join.bind(path);

module.exports = {
  default: {
    pathQuery: 'reg query HKEY_CURRENT_USER\\Software\\Classes\\http\\shell\\open\\command',
    pathRE: /"([^"]+)"/,
  },
  chrome: {
    defaultLocation: getPath(appData, 'Google', 'Chrome', 'Application', 'chrome.exe') ,
    pathQuery: 'dir /s /b chrome.exe',
    cwd: cwd
  },
  canary: {
    defaultLocation: getPath(appData, 'Google', 'Chrome SxS', 'Application', 'chrome.exe')
  },
  firefox: {
    defaultLocation: getPath(programFiles, 'Mozilla Firefox', 'firefox.exe'),
    pathQuery: 'dir /s /b firefox.exe',
    cwd: cwd
  },
  aurora: {
    defaultLocation: getPath(programFiles, 'Aurora', 'firefox.exe')
  },
  opera: {
    defaultLocation: getPath(programFiles, 'Opera', 'launcher.exe'),
    pathQuery: 'dir /s /b opera.exe',
    cwd: cwd,
    imageName: 'opera.exe'
  },
  ie: {
    defaultLocation: getPath(programFiles, 'Internet Explorer', 'iexplore.exe'),
    pathQuery: 'dir /s /b iexplore.exe',
    cwd: cwd
  },
  phantomjs: {
    pathQuery: 'dir /s /b phantomjs.exe',
    args: [path.join(__dirname, '..', '..', '..', 'resources/phantom.js')],
    multi: true,
    cwd: cwd
  }
}
