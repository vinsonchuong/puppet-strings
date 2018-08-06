/* @flow */
import ava from 'ava'
import {
  withFirefoxPerTest,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import { getTabs, navigate, findElement, clickElement } from 'puppet-strings'

const ava2 = withFirefoxPerTest(ava)
const test = withDirectory(ava2)

test('clicking an element', async t => {
  const { directory, browser } = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <span id="statusText"></span>
    <button onClick="statusText.textContent = 'Clicked'">Click Here</button>
  `
  )

  const [tab] = await getTabs(browser)
  await navigate(tab, `file://${htmlPath}`)
  const element = await findElement(tab, 'button')
  await clickElement(element)

  t.is((await findElement(tab, 'span')).innerText, 'Clicked')
})
