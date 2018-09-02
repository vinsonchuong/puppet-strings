/* @flow */
import ava from 'ava'
import {
  withFirefoxPerTest,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import * as path from 'path'
import { getTabs, navigate, findElement, selectFiles } from 'puppet-strings'

const ava2 = withDirectory(ava)
const test = withFirefoxPerTest(ava2)

test('selecting files for a file input element', async t => {
  const { directory, browser } = t.context

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

  const [tab] = await getTabs(browser)
  await navigate(tab, `file://${htmlPath}`)

  const fileInput = await findElement(tab, '#fileInput')
  await selectFiles(fileInput, htmlPath, path.resolve('package.json'))

  const statusText = await findElement(tab, '#statusText')
  t.is(statusText.innerText, 'index.html, package.json')
})
