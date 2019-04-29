/* @flow */
import ava from 'ava'
import {
  withChromePerTest,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import { openTab, closeTab } from 'puppet-strings'

const ava2 = withDirectory(ava)
const test = withChromePerTest(ava2)

test('closing tabs', async t => {
  const { browser, directory } = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    `
  )

  const tab1 = await openTab(browser, `file://${filePath}`)
  const tab2 = await openTab(browser, `file://${filePath}`)

  await closeTab(tab1)
  t.is((await browser.puppeteer.browser.pages()).length, 1)

  await closeTab(tab2)
  t.is((await browser.puppeteer.browser.pages()).length, 0)
})
