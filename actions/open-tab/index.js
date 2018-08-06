/* @flow */
import type { Tab } from 'puppet-strings'
import { branchOnBrowser } from 'puppet-strings'
import { makeTab } from 'puppet-strings/wrappers'

type Options = {
  timeout?: number
}

export default branchOnBrowser({
  async puppeteer(
    {
      puppeteer: { browser }
    },
    url: string,
    options: Options = {}
  ): Promise<Tab> {
    const page = await browser.newPage()
    const tab = makeTab(browser, page)

    try {
      await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
        timeout: options.timeout || 5000
      })
    } catch (error) {
      throw new Error(`Failed to open tab: ${error.message}`)
    }

    return tab
  },

  async selenium() {
    throw new Error(
      'Selenium only supports controlling one tab at a time. Use getTabs to access the currently open tab.'
    )
  }
})
