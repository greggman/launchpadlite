var path = require('path');

module.exports = {
  default: {
    pathQuery: path.join(__dirname, "osx_get_default_browser_bundle"),
    command: 'open',
    openArgs: ['-b'],
  },
  chrome: {
    pathQuery: 'mdfind \'kMDItemDisplayName == "Google Chrome" && kMDItemKind == Application\'',
    plistPath: 'Contents/Info.plist',
    command: 'open',
    openArgs: ['-a'],
    defaultLocation: '/Applications/Google Chrome.app',
  },
  canary: {
    pathQuery: 'mdfind \'kMDItemDisplayName == "Google Chrome Canary" && kMDItemKind == Application\'',
    plistPath: 'Contents/Info.plist',
    command: 'open',
    openArgs: ['-a'],
    defaultLocation: '/Applications/Google Chrome Canary.app',
  },
  firefox: {
    pathQuery: 'mdfind \'kMDItemDisplayName == "Firefox" && kMDItemKind == Application\'',
    plistPath: 'Contents/Info.plist',
    command: 'open',
    openArgs: ['-a'],
    defaultLocation: '/Applications/Firefox.app',
  },
  opera: {
    pathQuery: 'mdfind \'kMDItemDisplayName == "Opera" && kMDItemKind == Application\'',
    plistPath: 'Contents/Info.plist',
    command: 'open',
    openArgs: ['-a'],
    defaultLocation: '/Applications/Opera.app',
  },
  safari: {
    pathQuery: 'mdfind \'kMDItemDisplayName == "Safari" && kMDItemKind == Application\'',
    plistPath: 'Contents/version.plist',
    command: 'open',
    openArgs: ['-a'],
    defaultLocation: '/Applications/Safari.app'
  },
}
