/* @flow */
import type { Browser } from 'puppet-strings'
import puppeteer from 'puppeteer'

export default async function(): Promise<Browser> {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--headless',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--hide-scrollbars',
      '--mute-audio'
    ]
  })
  const pages = await browser.pages()
  await pages[0].close()
  return { puppeteer: { browser } }
}
