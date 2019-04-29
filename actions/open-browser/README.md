# `openBrowser(command, [options])`
Starts a new instance of a locally-installed Chrome or Chrome-like browser

## Example
```js
import { openBrowser } from 'puppet-strings'

async function run() {
  const headlessBrowser = await openBrowser('google-chrome')
  const headfulBrowser = await openBrowser('google-chrome', { headless: false })
}

run()
```

## Parameters
* `command` (string): The CLI command to start the browser
* `options = {}` (object)
  * `flags = []` (Array<string>): Additional CLI flags to pass to the browser
  * `headless = true` (boolean): When `true`, attempts to start the browser
    without a GUI

## Returns
* `browser` ([Promise<Browser>](../../interface#browser-object))

## Details
`openBrowser` expects to be given a CLI `command` to execute. Examples include:

* `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
* `chromium`
* `/usr/bin/chromium`
* `google-chrome`
* `/opt/google/chrome/chrome`
* `./node_modules/.bin/electron`

`openBrowser` is known to work with the latest stable version of Chromium or
Google Chrome, as well as recent versions of Electron.

### Headless by Default
By default, the browser is launched in headless mode, which disables its
graphical interface. Running headless is useful for eliminating interference
from your mouse and keyboard. Headless mode also enables the browser to run
within environments that do not have a monitor attached.

### Docker Containers and CI Services
Browser automation is commonly used for running automated tests for web
applications. Now that most CI services execute builds within Docker
containers, it has become important for browser automation tools to be able to
run within the limited environment of a Docker container.

Docker containers are usually not attached to a display, and they usually
restrict the types of allowed system calls. `puppet-strings` adapts Chrome to
be able to run despite these restrictions by enabling headless mode as well as
disabling Chrome's process sandbox.

### Process Management
Use [`closeBrowser`](../close-browser) to gracefully end browser processes that
are no longer needed.

Otherwise, when the Node.js process that calls `openBrowser` ends, the browser
will be killed with `SIGKILL`.
