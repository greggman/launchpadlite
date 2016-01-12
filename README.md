# LaunchpadLite

You can launch browsers! With NodeJS!

* __Local browsers__ for MacOS, Windows and Linux (like) operating systems

This is a fork of <a href="https://github.com/ekryski/launchpad">Launchpad</a>
paired down just for my needs.

# Rational

I only need to launch a browser for the user to view a page, not for testing. I didn't want to
start from scratch beceause I knew there's likely lots of little issues I'm not
aware of.

But, that also means much of the functionality of the original launchpad was stuff
I didn't need.

I found a few issues. It didn't work in my XP. The code expected `LOCALAPPDATA` but for
whatever reason on my XP there's only `APPDATA`. It also didn't work on my Windows 8.1. I don't
know what the issue was but removing the version checking code fixed that. ShowVer.exe which
they included runs on Windows 8.1 but I didn't need any version info so I just ripped that out.

I removed all the code related to checking for the browser already running.

I also needed the option to launch the user's default browser so I added that it. It's identified
as "default".

It's down from 43k lines of dependencies to 3.7k lines of which 3k are the *underscore* and *q* npm modules.

## API

    var launch = require('launchpadlite');
    var optionsPassedToChildProcessSpawn = {
      detach: true, // If you want to be able to exit node without killing the browser.
    };

    launch.local(optionsPassedToChildProcessSpawn, function(error, launcher) {
      launcher.browsers(function(error, browsers) {
        // -> List of available browsers
        browsers.forEach(function(browser) {
          console.log(browser.name);
        });
      });

      launcher[<browsername>](url, function(error, instance) {
        instance.id // -> unique instance id
        instance.stop(callback) // -> Stop the instance
        instance.status(callback) // -> Get status information about the instance
      });
    });



