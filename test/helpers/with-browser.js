import chrome from 'puppet-strings-chrome'
import {openBrowser, closeBrowser} from '../../index.js'

export function withChromePath(test) {
  test.serial.before(async () => {
    global.chromePath =
      (await chrome.findChrome()) || (await chrome.downloadChrome())
  })
}

export function withChrome(test) {
  withChromePath(test)

  test.serial.before(async () => {
    global.browser = await openBrowser(global.chromePath)
  })

  test.after.always(async () => {
    if (global.browser) {
      await closeBrowser(global.browser)
    }
  })
}

export function withChromePerTest(test) {
  withChromePath(test)

  test.beforeEach(async (t) => {
    t.context.browser = await openBrowser(global.chromePath)
  })

  test.afterEach.always(async (t) => {
    if (t.context.browser) {
      await closeBrowser(t.context.browser)
    }
  })
}
