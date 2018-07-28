# `navigate(tab, url, options)`
Navigates a tab to a new URL

## Example
```js
import { openBrowser, openTab, navigate } from 'puppet-strings'

async function run() {
  const browser = await openBrowser()
  const tab = await openTab(browser, 'https://npmjs.com')

  await navigate(tab, 'https://google.com')
  await navigate(tab, 'https://example.com/slow', { timeout: 60000 })
}

run()
```

## Parameters
* `tab` ([Tab](../../interface#tab-object))
* `url` (string)
* `options = {}` (object)
  * `timeout` (number): Number of milliseconds to wait for the page to load
    before throwing an error

## Returns
* `promise` (Promise<void>)

## Details
`navigate` waits until the page is fully loaded and has not made a network
request for `500ms`. Note that WebSocket connections are ignored. By default,
`navigate` will wait at most 5 seconds and then throw an error. Set a custom
timeout by passing in the `timeout` option.
