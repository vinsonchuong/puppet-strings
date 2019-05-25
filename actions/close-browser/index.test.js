/* @flow */
import test from 'ava'
import {
  findProcess,
  waitForProcess,
  withChromePath
} from 'puppet-strings/test/helpers'
import { openBrowser, closeBrowser } from 'puppet-strings'

withChromePath()

test('closing a browser', async t => {
  const browser = await openBrowser(global.chromePath)
  const {
    puppeteer: { browser: puppeteerBrowser }
  } = browser

  t.truthy(await waitForProcess(puppeteerBrowser.process()))
  await closeBrowser(browser)
  t.falsy(await findProcess(puppeteerBrowser.process()))
})
