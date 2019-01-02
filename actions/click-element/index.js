/* @flow */
import { branchOnElement } from 'puppet-strings'

export default branchOnElement<[], Promise<void>>({
  async puppeteer({ puppeteer: { elementHandle } }) {
    await elementHandle.click()
  },

  async selenium({ selenium: { webElement } }) {
    await webElement.click()
  }
})
