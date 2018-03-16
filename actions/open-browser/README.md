# `openBrowser([options])`
Starts a new instance of Chrome

## Example
```js
import { openBrowser } from 'puppet-strings'

async function run() {
  const headlessBrowser = await openBrowser()
  const headfulBrowser = await openBrowser({ headless: false })
}

run()
```

## Parameters
* `options = {}` (object)
  * `headless = true` (boolean): When `true`, starts Chrome without its GUI.

## Returns
* `browser` ([Promise<Browser>](../../interface#browser-object))

## Details

### Headless by Default
By default, Chrome is launched in headless mode, which disables its graphical
interface. Running headless is useful for eliminating interference from your
mouse and keyboard. Headless mode also enables Chrome to run within environments
that do not have a monitor attached.

### Docker Containers and CI Services
Browser automation is commonly used for running automated tests for web
applications. Now that most CI services execute builds within Docker
containers, it has become important for browser automation tools to be able to
run within the limited environment of a Docker container.

Docker containers are usually not attached to a display, and they usually
restrict the types of allowed system calls. `puppet-strings` adapts Chrome to
be able to run despite these restrictions by enabling headless mode as well as
disabling Chrome's process sandbox.
