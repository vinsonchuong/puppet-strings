# `evalInTab(tab, args, functionBody)`
Evaluates code within a tab and returns the result

## Example
```js
import { openBrowser, openTab, evalInTab } from 'puppet-strings'

async function run() {
  const browser = await openBrowser('google-chrome')
  const tab = await openTab(browser, 'http://example.com')

  const title = await evalInTab(tab, [], 'return document.title')

  const selector = 'body'
  const contents = await evalInTab(tab, [selector], `
    const [selector] = arguments
    return document.querySelector(selector).textContent
  `)
}
run()
```

## Parameters
* `tab` ([Tab](../../interface#tab-object))
* `args` (Array<JSON>): A list of primitive values to send into the browser

## Returns
* `result` (Promise<JSON>): A primitive value returned by the browser

## Details
`evalInTab` takes the `functionBody`, sends it into the browser as a string,
and declares it as a `function` within the browser.

So, if `functionBody` is:

```js
`
  const x = 1
  const y = 2
  return x + y
`
```

Then, the following `function` would be declared and run in the browser:

```js
(function() {
  const x = 1
  const y = 2
  return x + y
})()
```

This allows us to pass `arguments` into that `function`.

So, if `args` is `[1, 2]` and `functionBody` is

```js
const [x, y] = arguments
return x + y
```

Then, the following code would be run in the browser:

```js
(function() {
  const [x, y] = arguments
  return x + y
})(1, 2)
```

And, the `result` would be `3`.
