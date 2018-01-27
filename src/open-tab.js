/* @flow */
import type { Browser, Tab } from 'puppet-strings'

export default async function(
  { puppeteer: { browser } }: Browser,
  url: string
): Promise<Tab> {
  const page = await browser.newPage()

  const console = []
  page.on('console', consoleMessage =>
    console.push({
      type: consoleMessage.type(),
      message: consoleMessage.text()
    })
  )

  await page.goto(url, {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0']
  })
  return { puppeteer: { browser, page }, console }
}
