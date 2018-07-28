/* @flow */
import { branchOnTab } from 'puppet-strings'

export default branchOnTab({
  async puppeteer({ puppeteer: { page } }) {
    await page.close()
  },

  async selenium() {
    throw new Error(
      'Selenium only supports controlling one tab at a time. Closing the current tab is not supported.'
    )
  }
})
