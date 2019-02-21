/* @flow */
import { branchOnElement } from 'puppet-strings'

export default branchOnElement<Array<string>, Promise<void>>({
  async puppeteer({ puppeteer: { page, elementHandle } }, ...filePaths) {
    await elementHandle.uploadFile(...filePaths)
  },

  async selenium({ selenium: { webDriver, webElement } }, ...filePaths) {
    for (const filePath of filePaths) {
      await webElement.sendKeys(filePath)
    }
  }
})
