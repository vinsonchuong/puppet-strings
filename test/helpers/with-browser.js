/* @flow */
import test from 'ava'
import { openBrowser, closeBrowser } from 'puppet-strings'

export default function() {
  test.before(async t => {
    global.browser = await openBrowser()
  })

  test.after.always(async t => {
    await closeBrowser(global.browser)
  })
}
