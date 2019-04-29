/* @flow */
import type { Browser } from 'puppet-strings'
// $FlowFixMe
import puppeteer from 'puppeteer-core'

export default async function(
  executablePath: string,
  options: {
    flags?: Array<string>,
    headless?: boolean
  } = {}
): Promise<Browser> {
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'headless' in options ? options.headless : true,
    args: [
      // Disabling the process sandbox makes it easier to run in Linux
      // environments
      '--no-sandbox',
      '--disable-setuid-sandbox',
      ...(options.flags || [])
    ]
  })

  // Chrome defaults to opening a single blank tab
  const pages = await browser.pages()
  await pages[0].close()

  return { puppeteer: { browser } }
}
