/* @flow */
import test from 'ava'
import { openBrowser, closeBrowser } from 'puppet-strings'

export default function({ perTest = false }: { perTest: boolean } = {}): void {
  if (perTest) {
    test.beforeEach(async t => {
      t.context.browser = await openBrowser()
    })

    test.afterEach.always(async t => {
      await closeBrowser(t.context.browser)
    })
  } else {
    test.before(async t => {
      global.browser = await openBrowser()
    })

    test.after.always(async t => {
      await closeBrowser(global.browser)
    })
  }
}
