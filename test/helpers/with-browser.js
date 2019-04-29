/* @flow */
/* eslint-disable flowtype/no-weak-types */
import type { TestInterface } from 'ava'
import type { Browser } from 'puppet-strings'
import test from 'ava'
import { openBrowser, closeBrowser } from 'puppet-strings'

const chromeCli = process.env.CI ? 'google-chrome' : 'chromium'

export function withChrome() {
  test.before(async t => {
    global.browser = await openBrowser(chromeCli)
  })

  test.after.always(async t => {
    if (global.browser) {
      await closeBrowser(global.browser)
    }
  })
}

export function withChromePerTest<Context: {}>(
  test: TestInterface<Context>
): TestInterface<{ ...$Exact<Context>, browser: Browser }> {
  const newTest: TestInterface<{
    ...$Exact<Context>,
    browser: Browser
  }> = (test: any)

  newTest.beforeEach(async t => {
    t.context.browser = await openBrowser(chromeCli)
  })

  newTest.afterEach.always(async t => {
    if (t.context.browser) {
      await closeBrowser(t.context.browser)
    }
  })

  return newTest
}
