/* @flow */
import { branchOnElement } from 'puppet-strings'

export default branchOnElement({
  async puppeteer(
    {
      puppeteer: { page, elementHandle }
    },
    ...filePaths: Array<string>
  ) {
    await elementHandle.uploadFile(...filePaths)
  },

  async selenium(
    {
      selenium: { webDriver, webElement }
    },
    ...filePaths: Array<string>
  ) {
    for (const filePath of filePaths) {
      await webElement.sendKeys(filePath)
    }
  }
})
