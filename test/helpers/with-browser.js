/* @flow */
import test from 'ava'
import { openBrowser, openFirefox, closeBrowser } from 'puppet-strings'

type Config = {
  perTest: boolean,
  type: 'chrome' | 'firefox'
}

export default function({ perTest, type }: Config): void {
  if (perTest) {
    test.beforeEach(async t => {
      if (type === 'chrome') {
        t.context.browser = await openBrowser()
      } else if (type === 'firefox') {
        t.context.browser = await openFirefox()
      }
    })

    test.afterEach.always(async t => {
      await closeBrowser(t.context.browser)
    })
  } else {
    test.before(async t => {
      if (type === 'chrome') {
        global.browser = await openBrowser()
      } else if (type === 'firefox') {
        global.browser = await openFirefox()
      }
    })

    test.after.always(async t => {
      await closeBrowser(global.browser)
    })
  }
}
