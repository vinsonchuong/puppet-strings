# `findElement(tab, selector, text, options)`
Find a DOM element on the page by CSS selector

## Example
```js
import { openBrowser, openTab, findElement } from 'puppet-strings'

async function run() {
  const browser = await openBrowser('google-chrome')
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
* `options = {}` (object)
  * `timeout = 5000` (number): How long to search for a match

## Returns
* `element` ([Promise<Element>](../../interface#element-object))

## Details
`findElement` searches the page and all its `iframe`s for a default of 5
seconds, returning the first element that matches the CSS `selector` and
contains the `text` (if provided) or throwing an exception if none are found.

The object returned will contain as properties the `innerText`, `outerHTML`, and
`attributes` of the element.
