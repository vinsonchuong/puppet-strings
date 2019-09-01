/* @flow */
import type { Tab } from 'puppet-strings'

export default async function(
  { puppeteer: { page } }: Tab,
  width: number,
  height: number
): Promise<void> {
  await page.setViewport({ width, height })
}
