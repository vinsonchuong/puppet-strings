/* @flow */
import test from 'ava'
import { openChrome, openFirefox, closeBrowser } from 'puppet-strings'

type Config = {
  perTest: boolean,
  type: 'chrome' | 'firefox'
}

export default function({ perTest, type }: Config): void {
  if (perTest) {
    test.beforeEach(async t => {
      t.context.browser = await openBrowser(type)
    })

    test.afterEach.always(async t => {
      if (t.context.browser) {
        await closeBrowser(t.context.browser)
      }
    })
  } else {
    test.before(async t => {
      global.browser = await openBrowser(type)
    })

    test.after.always(async t => {
      if (global.browser) {
        await closeBrowser(global.browser)
      }
    })
  }
}

function openBrowser(type: 'chrome' | 'firefox') {
  if (type === 'chrome') {
    return openChrome()
  } else if (type === 'firefox') {
    return openFirefox()
  }
}
