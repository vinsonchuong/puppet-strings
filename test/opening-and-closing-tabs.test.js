/* @flow */
import test from 'ava'
import { withBrowser } from './helpers'
import { openTab, closeTab } from 'puppet-strings'

withBrowser()

test.serial('opening and closing tabs', async t => {
  const { browser } = global
  t.is((await browser.puppeteer.browser.pages()).length, 0)

  const tab1 = await openTab(browser, 'http://example.com')
  const tab2 = await openTab(browser, 'http://example.com')
  t.is((await browser.puppeteer.browser.pages()).length, 2)

  await closeTab(tab1)
  t.is((await browser.puppeteer.browser.pages()).length, 1)

  await closeTab(tab2)
  t.is((await browser.puppeteer.browser.pages()).length, 0)
})

test.serial('collecting console messages', async t => {
  const { browser } = global
  const tab = await openTab(browser, 'http://example.com')

  await tab.puppeteer.page.evaluate(() => {
    console.log('Hello')
    console.error('There')
  })
  t.deepEqual(tab.console, [
    { type: 'log', message: 'Hello' },
    { type: 'error', message: 'There' }
  ])
})
