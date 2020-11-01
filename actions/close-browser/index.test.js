import test from 'ava'
import {
  findProcess,
  waitForProcess,
  withChromePath
} from '../../test/helpers/index.js'
import {openBrowser, closeBrowser} from '../../index.js'

withChromePath(test)

test('closing a browser', async (t) => {
  const browser = await openBrowser(global.chromePath)
  const {
    puppeteer: {browser: puppeteerBrowser}
  } = browser

  t.truthy(await waitForProcess(puppeteerBrowser.process()))
  await closeBrowser(browser)
  t.falsy(await findProcess(puppeteerBrowser.process()))
})
