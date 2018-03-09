/* eslint-disable no-new-func, flowtype/no-weak-types */
/* @flow */
import type { Tab } from 'puppet-strings'

export default async function(
  { puppeteer: { page } }: Tab,
  args: Array<any>,
  functionBody: string
): Promise<any> {
  try {
    return await page.evaluate(new Function(functionBody), ...args)
  } catch (error) {
    throw new Error(`Failed to evaluate code in tab: ${error.message}`)
  }
}
