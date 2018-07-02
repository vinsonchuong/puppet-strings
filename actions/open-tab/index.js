/* @flow */
import type { Browser, Tab } from 'puppet-strings'
import { makeTab } from 'puppet-strings/wrappers'

type Options = {
  timeout?: number
}

export default async function(
  { puppeteer: { browser } }: Browser,
  url: string,
  options: Options = {}
): Promise<Tab> {
  const page = await browser.newPage()
  const tab = makeTab(browser, page)

  try {
    await page.goto(url, {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
      timeout: options.timeout || 5000
    })
  } catch (error) {
    throw new Error(`Failed to open tab: ${error.message}`)
  }

  return tab
}
