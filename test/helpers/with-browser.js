/* @flow */
/* eslint-disable flowtype/no-weak-types */
import type { TestInterface } from 'ava'
import type { Browser } from 'puppet-strings'
import test from 'ava'
import { openChrome, openFirefox, closeBrowser } from 'puppet-strings'

export function withChrome() {
  test.before(async t => {
    global.browser = await openChrome()
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
    t.context.browser = await openChrome()
  })

  newTest.afterEach.always(async t => {
    if (t.context.browser) {
      await closeBrowser(t.context.browser)
    }
  })

  return newTest
}

export function withFirefoxPerTest<Context: {}>(
  test: TestInterface<Context>
): TestInterface<{ ...$Exact<Context>, browser: Browser }> {
  const newTest: TestInterface<{
    ...$Exact<Context>,
    browser: Browser
  }> = (test: any)

  newTest.beforeEach(async t => {
    t.context.browser = await openFirefox()
  })

  newTest.afterEach.always(async t => {
    if (t.context.browser) {
      await closeBrowser(t.context.browser)
    }
  })

  return newTest
}
