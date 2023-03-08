# `openTab(browser, url?, options?)`
Opens new tab, optionally navigating to a URL and waiting for it to fully load

## Example
```js
import { openBrowser, openTab } from 'puppet-strings'

async function run() {
  const browser = await openBrowser('google-chrome')

  const tab = await openTab(browser, 'http://example.com')

  const slowToLoadTab = await openTab(
    browser,
    'http://example.com',
    { timeout: 60000 }
  )
}

run()
```

## Parameters
* `browser` ([Browser](../../interface#browser-object))
* `url` (optional string)
* `options = {}` (object)
  * `timeout` (number): Number of milliseconds to wait for the page to load
    before throwing an error

## Returns
* `tab` ([Promise<Tab>](../../interface#tab-object))

## Details
When not given any arguments, `openTab` defaults to `about:blank`.

When given a URL, `openTab` waits until the page is fully loaded and has not
made a network request for `500ms`. Note that WebSocket connections are ignored.
By default, `openTab` will wait at most 5 seconds and then throw an error. Set a
custom timeout by passing in the `timeout` option.
