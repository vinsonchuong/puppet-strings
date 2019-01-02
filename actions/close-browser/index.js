/* @flow */
import { branchOnBrowser } from 'puppet-strings'

export default branchOnBrowser<[], Promise<void>>({
  async puppeteer({ puppeteer: { browser } }) {
    await browser.close()
  },

  async selenium({ selenium: { webDriver } }) {
    await webDriver.quit()
  }
})
