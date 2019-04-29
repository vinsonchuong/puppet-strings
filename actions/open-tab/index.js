/* @flow */
import type { Browser, Tab } from 'puppet-strings'
import { navigate } from 'puppet-strings'
import { makeTab } from 'puppet-strings/wrappers'

type Options = {
  timeout: number
}

export default async function(
  { puppeteer: { browser } }: Browser,
  url: string,
  options: ?Options
): Promise<Tab> {
  const page = await browser.newPage()
  const tab = makeTab(browser, page)

  if (options) {
    await navigate(tab, url, options)
  } else {
    await navigate(tab, url)
  }

  return tab
}
