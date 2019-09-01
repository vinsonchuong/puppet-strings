# `resizeTab(tab, width, height)`
Changes the size of the viewport of a tab

## Example
```js
import { openBrowser, openTab, resizeTab } from 'puppet-strings'

async function run() {
  const browser = await openBrowser('google-chrome')
  const tab = await openTab(browser, 'http://example.com')
  await resizeTab(tab, 1200, 800)
}

run()
```

## Parameters
* `tab` ([Tab](../../interface#tab-object))
* `width` (number)
* `height` (number)

## Returns
* `promise` (Promise<void>)

## Details
The size of the viewport is changed, meaning `window.innerWidth` and
`window.innerHeight`. The actual Chrome window will be slightly larger.

Only the given tab will be affected; other tabs will keep their current size.
