/* @flow */
import { branchOnElement } from 'puppet-strings'

export default branchOnElement<[string], Promise<void>>({
  async puppeteer(
    {
      puppeteer: { page, elementHandle }
    },
    text
  ) {
    await elementHandle.type(text)
    await page.evaluate(elementHandle => elementHandle.blur(), elementHandle)
  },

  async selenium(
    {
      selenium: { webDriver, webElement }
    },
    text
  ) {
    await webElement.sendKeys(text)
    await webDriver.executeScript('arguments[0].blur()', webElement)
  }
})
