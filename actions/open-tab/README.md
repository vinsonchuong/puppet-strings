# `openTab(browser, url)`
Opens a url in a new tab and waits for it to fully load

## Example
```js
import { openBrowser, openTab } from 'puppet-strings'

async function run() {
  const browser = await openBrowser()
  const tab = await openTab(browser, 'http://example.com')
}

run()
```

## Parameters
* `browser` ([Browser](../../interface#browser-object))
* `url` (string)

## Returns
* `tab` ([Promise<Tab>](../../interface#tab-object))

## Details
`openTab` waits until the page is fully loaded and has not made a network
request for `500ms`. Note that WebSocket connections are ignored.

All console messages emitted by the tab are captured in the tab's `console`
property. Also, all uncaught exceptions are captured in the tab's `error`
property.
