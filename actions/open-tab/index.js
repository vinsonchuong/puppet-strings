/* @flow */
import type { Tab } from 'puppet-strings'
import { branchOnBrowser, navigate } from 'puppet-strings'
import { makeTab } from 'puppet-strings/wrappers'

export default branchOnBrowser({
  async puppeteer(
    {
      puppeteer: { browser }
    },
    url: string,
    options: *
  ): Promise<Tab> {
    const page = await browser.newPage()
    const tab = makeTab(browser, page)

    await navigate(tab, url, options)

    return tab
  },

  async selenium() {
    throw new Error(
      'Selenium only supports controlling one tab at a time. Use getTabs to access the currently open tab.'
    )
  }
})
