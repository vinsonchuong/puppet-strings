# `selectFiles(element, ...filePaths)`
Select files for a file input element

## Example
```js
import { openChrome, openTab, findElement, selectFiles } from 'puppet-strings'

async function run() {
  const browser = await openChrome()
  const tab = await openTab(browser, 'https://www.npmjs.com/')

  const fileInput = await findElement(tab, 'input[type="file"]')
  await selectFiles(fileInput, '/tmp/file1.txt', '/tmp/file2.txt')
}
run()
```

## Parameters
* `element` ([Element](../../interface#element-object))
* `...filePaths` (Array<string>)

## Returns
* `promise` (Promise<void>)

## Details
`selectFiles` populates a file input element with one or more files. Paths to
the files may be absolute or relative to the current working directory.
