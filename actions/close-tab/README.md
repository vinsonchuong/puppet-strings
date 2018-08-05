# `closeTab(tab)`
Closes a tab

## Example
```js
import { openChrome, openTab } from 'puppet-strings'

async function run() {
  const browser = await openChrome()
  const tab = await openTab(browser, 'http://example.com')
  await closeTab(tab)
}

run()
```

## Parameters
* `tab` ([Promise<Tab>](../../interface#tab-object))

## Returns
* `promise` (Promise<void>)

## Details
After a tab is closed, the corresponding [Tab](../../interface#tab-object)
object will no longer be valid. Subsequent actions on that tab will cause
exceptions.

For browsers controlled using Selenium, since only one tab can be controlled
at a time, closing tabs is not supported.
