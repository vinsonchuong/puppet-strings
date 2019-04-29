/* @flow */
import test from 'ava'
import { findProcess, waitForProcess } from 'puppet-strings/test/helpers'
import { openBrowser, closeBrowser } from 'puppet-strings'

const chromeCli = process.env.CI ? 'google-chrome' : 'chromium'

test('closing a browser', async t => {
  const browser = await openBrowser(chromeCli)
  const {
    puppeteer: { browser: puppeteerBrowser }
  } = browser

  t.truthy(await waitForProcess(puppeteerBrowser.process()))
  await closeBrowser(browser)
  t.falsy(await findProcess(puppeteerBrowser.process()))
})
