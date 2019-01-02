/* @flow */
/* eslint-disable no-new-func, flowtype/no-weak-types */
import { branchOnTab } from 'puppet-strings'

export default branchOnTab<[Array<any>, string], Promise<any>>({
  async puppeteer(
    {
      puppeteer: { page }
    },
    args,
    functionBody
  ) {
    try {
      return await page.evaluate(new Function(functionBody), ...args)
    } catch (error) {
      throw new Error(`Failed to evaluate code in tab: ${error.message}`)
    }
  },

  async selenium(
    {
      selenium: { webDriver }
    },
    args,
    functionBody
  ) {
    try {
      return await webDriver.executeScript(functionBody, ...args)
    } catch (error) {
      throw new Error(`Failed to evaluate code in tab: ${error.message}`)
    }
  }
})
