/* @flow */
import test from 'ava'
import { openBrowser, closeBrowser, openTab, closeTab } from 'puppet-strings'

test('opening and closing tabs', async t => {
  const browser = await openBrowser()
  t.is((await browser.puppeteer.browser.pages()).length, 0)

  const tab1 = await openTab(browser, 'http://example.com')
  const tab2 = await openTab(browser, 'http://example.com')
  t.is((await browser.puppeteer.browser.pages()).length, 2)

  await closeTab(tab1)
  t.is((await browser.puppeteer.browser.pages()).length, 1)

  await closeTab(tab2)
  t.is((await browser.puppeteer.browser.pages()).length, 0)

  await closeBrowser(browser)
})
