/* @flow */
import type { Browser, Tab } from 'puppet-strings'
import { makeTab } from 'puppet-strings/wrappers'

export default async function({
  puppeteer: { browser }
}: Browser): Promise<Array<Tab>> {
  const pages = await browser.pages()
  return pages.map(page => makeTab(browser, page))
}
