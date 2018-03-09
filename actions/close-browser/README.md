# `closeBrowser(browser)`
Closes the given Chrome browser.

## Example
```js
import { openBrowser, closeBrowser } from 'puppet-strings'

async function run() {
  const browser = await openBrowser()
  await closeBrowser(browser)
}

run()
```

## Parameters
* `browser` ([Browser](../../interface#browser-object))
