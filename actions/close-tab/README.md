# `closeTab(tab)`
Closes a tab

## Example
```js
import { openBrowser, openTab } from 'puppet-strings'

async function run() {
  const browser = await openBrowser()
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
