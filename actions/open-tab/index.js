/* @flow */
import type { Tab } from 'puppet-strings'
import { branchOnBrowser, navigate } from 'puppet-strings'
import { makeTab } from 'puppet-strings/wrappers'

type Options = {
  timeout: number
}

export default branchOnBrowser<[string] | [string, Options], Promise<Tab>>({
  async puppeteer(
    {
      puppeteer: { browser }
    },
    url,
    options
  ) {
    const page = await browser.newPage()
    const tab = makeTab(browser, page)

    if (options) {
      await navigate(tab, url, options)
    } else {
      await navigate(tab, url)
    }

    return tab
  },

  async selenium() {
    throw new Error(
      'Selenium only supports controlling one tab at a time. Use getTabs to access the currently open tab.'
    )
  }
})
