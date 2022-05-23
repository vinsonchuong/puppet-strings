# `navigate(tab, url, options)`
Navigates a tab to a new URL

## Example
```js
import { openBrowser, openTab, navigate } from 'puppet-strings'

async function run() {
  const browser = await openBrowser('google-chrome')
  const tab = await openTab(browser, 'https://npmjs.com')

  await navigate(tab, 'https://google.com')
  await navigate(tab, 'https://example.com/slow', { timeout: 60000 })
}

run()
```

## Parameters
* `tab` ([`Tab`](../../interface#tab-object))
* `url` (`string`)
* `options = {}` (`object`)
  * `timeout` (`number`): Number of milliseconds to wait for the page to load
    before throwing an error
  * `waitUntilNetworkIdle` (`boolean`): Wait until no network requests are made
    for at least `500ms`.

## Returns
* `promise` (`Promise<void>`)

## Details
`navigate` waits until the page and its referenced resources are fully loaded.
Note that this does not include waiting for JavaScript to finish executing.

Optionally, when `waitUntilNetworkIdle` is set to `true`, `navigate` will also
wait until no network requests have been made for at least `500ms`, ignoring
WebSocket connections.

By default, `navigate` will wait at most 5 seconds and then throw an error. Set
a custom timeout by passing in the `timeout` option.
