/* @flow */
import type { Tab } from 'puppet-strings'

type Options = {
  timeout: number
}

export default async function(
  { puppeteer: { page } }: Tab,
  url: string,
  options: Options = {}
): Promise<void> {
  try {
    await page.goto(url, {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
      timeout: options.timeout || 5000
    })
  } catch (error) {
    throw new Error(`Failed to navigate: ${error.message}`)
  }
}
