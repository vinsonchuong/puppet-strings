# `waitForNavigation(tab)`
Waits for a page load to complete

## Example
```js
import {
  openChrome, openTab, findElement, clickElement, waitForNavigation
} from 'puppet-strings'

async function run() {
  const browser = await openChrome()
  const tab = await openTab(browser, 'https://npmjs.com')

  const lodashLink = await findElement(tab, 'a', 'lodash')
  clickElement(lodashLink)

  await waitForNavigation(tab)
}

run()
```

## Parameters
* `tab` ([Tab](../../interface#tab-object))

## Returns
* `promise` (Promise<void>)

## Details
For actions that cause a separate page to be loaded, like

* Clicking on a link
* Submitting a native form
* Being redirected by application code

it is currently necessary to `waitForNavigation` before performing further
actions.

`waitForNavigation` waits until the page is fully loaded and has not made a
network request for `500ms`. Note that WebSocket connections are ignored.

[`openTab`](../open-tab) will always wait for the page to finish loading. So,
when opening a new tab, it's unnecessary to also `waitForNavigation`.
