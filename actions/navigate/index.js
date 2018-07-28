/* @flow */
import { branchOnTab } from 'puppet-strings'

type Options = {
  timeout?: number
}

export default branchOnTab({
  async puppeteer({ puppeteer: { page } }, url: string, options: Options = {}) {
    try {
      await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
        timeout: options.timeout || 5000
      })
    } catch (error) {
      throw new Error(`Failed to navigate: ${error.message}`)
    }
  },

  async selenium(
    { selenium: { webDriver } },
    url: string,
    options: Options = {}
  ) {
    try {
      await webDriver
        .manage()
        .setTimeouts({ pageLoad: options.timeout || 5000 })
      await webDriver.get(url)
    } catch (error) {
      throw new Error(`Failed to navigate: ${error.message}`)
    }
  }
})
