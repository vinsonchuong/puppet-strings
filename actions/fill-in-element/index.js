/* @flow */
import type { Element } from 'puppet-strings'

export default async function(
  { puppeteer: { page, elementHandle } }: Element,
  text: string
): Promise<void> {
  await elementHandle.type(text)

  // $FlowFixMe
  await page.evaluate(elementHandle => elementHandle.blur(), elementHandle)
}
