/* @flow */
import { branchOnTab } from 'puppet-strings'

export default branchOnTab({
  async puppeteer({ puppeteer: { page } }) {
    await page.close()
  }
})
