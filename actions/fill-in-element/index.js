/* @flow */
import { branchOnElement } from 'puppet-strings'

export default branchOnElement({
  async puppeteer({ puppeteer: { page, elementHandle } }, text: string) {
    await elementHandle.type(text)
    await page.evaluate(elementHandle => elementHandle.blur(), elementHandle)
  },

  async selenium({ selenium: { webDriver, webElement } }, text: string) {
    await webElement.sendKeys(text)
    await webDriver.executeScript('arguments[0].blur()', webElement)
  }
})
