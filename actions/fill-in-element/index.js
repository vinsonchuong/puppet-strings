/* @flow */
/* eslint-disable no-new-func */
import type { Element } from 'puppet-strings'

export default async function(
  { puppeteer: { frame, elementHandle } }: Element,
  text: string
): Promise<void> {
  await elementHandle.type(text)
  await frame.evaluate(
    new Function(`
      const [element] = arguments
      element.blur()
    `),
    elementHandle
  )
}
