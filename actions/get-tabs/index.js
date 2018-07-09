/* @flow */
import type { Tab } from 'puppet-strings'
import { branchOnBrowser } from 'puppet-strings'
import { makeTab } from 'puppet-strings/wrappers'

export default branchOnBrowser({
  async puppeteer({ puppeteer: { browser } }): Promise<Array<Tab>> {
    const pages = await browser.pages()
    return pages.map(page => makeTab(browser, page))
  }
})
