/* @flow */
import test from 'ava'
import { withBrowser, withDirectory, writeFile } from './helpers'
import { openTab, findElement, clickElement } from 'puppet-strings'

withBrowser()
withDirectory()

test('clicking an element', async t => {
  const { browser } = global
  const { directory } = t.context

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

  const tab = await openTab(browser, `file://${htmlPath}`)
  const element = await findElement(tab, 'button')
  await clickElement(element)

  t.is((await findElement(tab, 'span')).innerText, 'Clicked')
})
