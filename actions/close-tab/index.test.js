import test from 'ava'
import {
  withChromePerTest,
  withDirectory,
  writeFile,
} from '../../test/helpers/index.js'
import {openTab, closeTab} from '../../index.js'

withDirectory(test)
withChromePerTest(test)

test('closing tabs', async (t) => {
  const {browser, directory} = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    `,
  )

  const tab1 = await openTab(browser, `file://${filePath}`)
  const tab2 = await openTab(browser, `file://${filePath}`)

  await closeTab(tab1)
  t.is((await browser.puppeteer.browser.pages()).length, 1)

  await closeTab(tab2)
  t.is((await browser.puppeteer.browser.pages()).length, 0)
})
