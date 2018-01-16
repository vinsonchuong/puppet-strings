/* @flow */
import type { Element } from 'puppet-strings'

export default async function({
  puppeteer: { elementHandle }
}: Element): Promise<void> {
  await elementHandle.click()
}
