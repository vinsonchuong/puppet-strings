# `findElement(tab, selector, text)`
Find a DOM element on the page by CSS selector

## Example
```js
import { openChrome, openTab, findElement } from 'puppet-strings'

async function run() {
  const browser = await openChrome()
  const tab = await openTab(browser, 'https://www.npmjs.com/')

  const header = await findElement(tab, '#pane-homepage-hero h1')
  const blogLink = await findElement(tab, 'footer a', 'Blog')
}
run()
```

## Parameters
* `tab` ([Tab](../../interface#tab-object))
* `selector` (string): A CSS selector to search for
* `text` (string?): Optional text content to search for

## Returns
* `element` ([Promise<Element>](../../interface#element-object))

## Details
`findElement` returns the first element that matches the CSS `selector` and
contains the `text` (if provided). This is accomplished by transforming the
CSS `selector` and `text` substring into an XPath selector and evaluating it
directly in the browser.

If no matching element is found, an exception will be thrown.
