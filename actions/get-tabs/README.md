# `getTabs(browser)`
Gets the list of currently open tabs

## Example
```js
import { openBrowser, openTab, getTabs } from 'puppet-strings'

async function run() {
  const browser = await openBrowser('google-chrome')

  await openTab(browser, 'http://example.com')
  await openTab(browser, 'http://google.com')

  const tabs = await getTabs(browser)
}

run()
```

## Parameters
* `browser` ([Browser](../../interface#browser-object))

## Returns
* `tabs` ([Promise<<Array<Tab>>](../../interface#tab-object))

## Details
`getTabs` returns [Tab](../../interface#tab-object) objects that behave the same
as Tab objects returned by [`openTab`](../open-tab).

Note that two Tab objects that refer to the same browser tab will not
necessarily be `===`.

All console messages emitted by the tab are captured in the tab's `console`
property. Also, all uncaught exceptions are captured in the tab's `error`
property. Note that console messages and uncaught exceptions are captured moving
forward. Messages logged before `getTabs` is called are not available.
