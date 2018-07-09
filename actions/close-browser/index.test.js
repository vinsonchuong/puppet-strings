/* @flow */
import test from 'ava'
import { findProcess } from 'puppet-strings/test/helpers'
import {
  openBrowser,
  openFirefox,
  closeBrowser,
  branchOnBrowser
} from 'puppet-strings'

test('closing a Puppeteer browser', async t => {
  const browser = await openBrowser()

  await branchOnBrowser({
    async puppeteer(browser) {
      const { puppeteer: { browser: puppeteerBrowser } } = browser
      t.truthy(await findProcess(puppeteerBrowser.process()))
      await closeBrowser(browser)
      t.falsy(await findProcess(puppeteerBrowser.process()))
    }
  })(browser)
})

test('closing a Selenium browser', async t => {
  const browser = await openFirefox()

  await branchOnBrowser({
    async selenium(browser) {
      const capabilities = await browser.selenium.webDriver.getCapabilities()
      const pid = capabilities.get('moz:processID')

      t.truthy(await findProcess(pid))
      await closeBrowser(browser)
      t.falsy(await findProcess(pid))
    }
  })(browser)
})
