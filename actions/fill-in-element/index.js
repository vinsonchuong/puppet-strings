/* @flow */
import { branchOnElement } from 'puppet-strings'

export default branchOnElement({
  async puppeteer({ puppeteer: { page, elementHandle } }, text: string) {
    await elementHandle.type(text)
    await page.evaluate(elementHandle => elementHandle.blur(), elementHandle)
  }
})
