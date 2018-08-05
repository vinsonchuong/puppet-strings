/* @flow */
import test from 'ava'
import { findProcess, waitForProcess } from 'puppet-strings/test/helpers'
import {
  openChrome,
  openFirefox,
  closeBrowser,
  branchOnBrowser
} from 'puppet-strings'

test('closing a Puppeteer browser', async t => {
  const browser = await openChrome()

  await branchOnBrowser({
    async puppeteer(browser) {
      const { puppeteer: { browser: puppeteerBrowser } } = browser
      t.truthy(await waitForProcess(puppeteerBrowser.process()))
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

      t.truthy(await waitForProcess(pid))
      await closeBrowser(browser)
      t.falsy(await findProcess(pid))
    }
  })(browser)
})
