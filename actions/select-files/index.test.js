import path from 'node:path'
import test from 'ava'
import {withChrome, withDirectory, writeFile} from '../../test/helpers/index.js'
import {openTab, findElement, selectFiles} from '../../index.js'

withChrome(test)
withDirectory(test)

test('selecting files for a file input element', async (t) => {
  const {browser} = global
  const {directory} = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <script>
      function updateStatus() {
        const fileNames = Array.from(window.fileInput.files)
          .map(file => file.name)
          .join(', ')
        window.statusText.textContent = fileNames
      }
    </script>
    <span id="statusText"></span>
    <input id="fileInput" type="file" multiple onChange="updateStatus()">
  `
  )

  const tab = await openTab(browser, `file://${htmlPath}`)

  const fileInput = await findElement(tab, '#fileInput')
  await selectFiles(fileInput, htmlPath, path.resolve('package.json'))

  const statusText = await findElement(tab, '#statusText')
  t.is(statusText.textContent, 'index.html, package.json')
})
