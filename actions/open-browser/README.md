# `openBrowser([options])`
Starts a new instance of Chrome.

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
* `browser` ([Browser](../../interface/README.md#browser))
