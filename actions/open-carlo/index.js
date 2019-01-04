/* @flow */
/* eslint-disable flowtype/no-weak-types */
import type { Tab } from 'puppet-strings'
import { makeTab } from 'puppet-strings/wrappers'
import carlo from 'carlo'

carlo.enterTestMode()

export default async function(carloApp: any): Promise<Tab> {
  const browser = carloApp.browserForTest()
  const [page] = await browser.pages()

  return makeTab(browser, page)
}
