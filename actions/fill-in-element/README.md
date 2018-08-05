# `fillInElement(element, text)`
Type text into an element

## Example
```js
import { openChrome, openTab, findElement, fillInElement } from 'puppet-strings'

async function run() {
  const browser = await openChrome()
  const tab = await openTab(browser, 'https://www.npmjs.com/')

  const searchBox = await findElement(tab, '[placeholder="Search packages"]')
  await fillInElement(searchBox, 'puppet-strings')
}
run()
```

## Parameters
* `element` ([Element](../../interface#element-object))
* `text` (string)

## Returns
* `promise` (Promise<void>)

## Details
`fillInElement` focuses the `element`, types the `text`, and blurs the
`element`. It does not clear away any existing text.
