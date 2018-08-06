/* eslint-disable no-new-func, flowtype/no-weak-types */
/* @flow */
import { branchOnTab } from 'puppet-strings'

export default branchOnTab({
  async puppeteer(
    {
      puppeteer: { page }
    },
    args: Array<any>,
    functionBody: string
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
    args: Array<any>,
    functionBody: string
  ) {
    try {
      return await webDriver.executeScript(functionBody, ...args)
    } catch (error) {
      throw new Error(`Failed to evaluate code in tab: ${error.message}`)
    }
  }
})
