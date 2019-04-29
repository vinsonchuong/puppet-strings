/* @flow */
import type { Element } from 'puppet-strings'

export default async function(
  { puppeteer: { page, elementHandle } }: Element,
  ...filePaths: Array<string>
): Promise<void> {
  await elementHandle.uploadFile(...filePaths)
}
