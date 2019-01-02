/* @flow */
import type { Tab } from 'puppet-strings'
import { branchOnBrowser } from 'puppet-strings'
import { makeTab } from 'puppet-strings/wrappers'

export default branchOnBrowser<[], Promise<Array<Tab>>>({
  async puppeteer({ puppeteer: { browser } }) {
    const pages = await browser.pages()
    return pages.map(page => makeTab(browser, page))
  },

  async selenium({ selenium: { webDriver } }) {
    return [
      {
        console: [],
        errors: [],
        selenium: { webDriver }
      }
    ]
  }
})
