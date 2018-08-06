# `openElectron(applicationPath, [options])`
Starts an Electron application

## Example
```js
import { openElectron } from 'puppet-strings'

async function run() {
  const electron = await openElectron('.', { flags: ['-r', '@babel/register'] })
  const browserWindows = await getTabs(electron)
}

run()
```

## Parameters
* `applicationPath` (string): The path to an Electron application as defined by
  the `electron` CLI
* `options = {}` (object)
  * `flags = []` (Array<string>): Additional CLI flags to pass to `electron`

## Returns
* `browser` ([Promise<Browser>](../../interface#browser-object))

## Details
The path to an Electron application is usually the path to its root directory,
one that contains a `package.json`. Many Electron projects have compilation
tooling that outputs the final JavaScript code into a `dist` directory. In any
case, `openElectron` can take any path that the `electron` CLI tool can take.

Additional CLI flags can be passed to `electron`, enabling usecases like
loading `@babel/register`.

Electron behaves very much like an ordinary Chrome browser, with each
[`BrowserWindow`](https://electronjs.org/docs/api/browser-window) behaving like
a browser tab. Because `puppet-strings` is built primarily for automating
browsers, browser-specific metaphors will be used throughout.

Unlike Chrome, Electron currently does not support headless mode. It will always
attempt to open a GUI window, even in environments that don't support it, like
Docker containers and most CI services. For running in these environments,
ensure that Xvfb is installed. `openElectron` will start Xvfb automatically if
necessary.

Use [`closeBrowser`](../close-browser) to gracefully end Electron processes that
are no longer needed. Otherwise, when the Node.js process that calls
`openElectron` ends, Electron will be killed with `SIGKILL`.
