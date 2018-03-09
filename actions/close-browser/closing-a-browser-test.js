/* @flow */
import test from 'ava'
import { findProcess } from 'puppet-strings/test/helpers'
import { openBrowser, closeBrowser } from 'puppet-strings'

test('starting headless by default', async t => {
  const browser = await openBrowser()

  t.truthy(await findProcess(browser.puppeteer.browser.process()))
  await closeBrowser(browser)
  t.falsy(await findProcess(browser.puppeteer.browser.process()))
})
