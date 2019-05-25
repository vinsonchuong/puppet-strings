/* @flow */
/* eslint-disable flowtype/no-weak-types */
import type { TestInterface } from 'ava'
import type { Browser } from 'puppet-strings'
import test from 'ava'
import { findChrome, downloadChrome } from 'puppet-strings-chrome'
import { openBrowser, closeBrowser } from 'puppet-strings'

export function withChromePath() {
  test.serial.before(async () => {
    global.chromePath = (await findChrome()) || (await downloadChrome())
  })
}

export function withChrome() {
  withChromePath()

  test.serial.before(async () => {
    global.browser = await openBrowser(global.chromePath)
  })

  test.after.always(async () => {
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

  withChromePath()

  newTest.beforeEach(async t => {
    t.context.browser = await openBrowser(global.chromePath)
  })

  newTest.afterEach.always(async t => {
    if (t.context.browser) {
      await closeBrowser(t.context.browser)
    }
  })

  return newTest
}
