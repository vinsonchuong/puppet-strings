# `openFirefox([options])`
Starts a new instance of Firefox

## Example
```js
import { openFirefox } from 'puppet-strings'

async function run() {
  const headlessFirefox = await openFirefox()
  const headfulFirefox = await openFirefox({ headless: false })
}

run()
```

## Parameters
* `options = {}` (object)
  * `headless = true` (boolean): When `true`, starts Firefox without its GUI.

## Returns
* `browser` ([Promise<Browser>](../../interface#browser-object))

## Details

### Headless by Default
By default, Firefox is launched in headless mode, which disables its graphical
interface. Running headless is useful for eliminating interference from your
mouse and keyboard. Headless mode also enables Firefox to run within environments
that do not have a monitor attached.

### Docker Containers and CI Services
Browser automation is commonly used for running automated tests for web
applications. Now that most CI services execute builds within Docker
containers, it has become important for browser automation tools to be able to
run within the limited environment of a Docker container.
