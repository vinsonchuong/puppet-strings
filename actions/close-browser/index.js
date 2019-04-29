/* @flow */
import type { Browser } from 'puppet-strings'

export default async function({
  puppeteer: { browser }
}: Browser): Promise<void> {
  await browser.close()
}
