# `clickElement(element)`
Click on an element

## Example
```js
import { openChrome, openTab, findElement, clickElement } from 'puppet-strings'

async function run() {
  const browser = await openChrome()
  const tab = await openTab(browser, 'https://www.npmjs.com/')

  const blogLink = await findElement(tab, 'footer a', 'Blog')
  await clickElement(blogLink)
}
run()
```

## Parameters
* `element` ([Element](../../interface#element-object))

## Returns
* `promise` (Promise<void>)

## Details
`clickElement` performs a single left click on the given `element`.
