/* @flow */
import type { Browser } from 'puppet-strings'
import puppeteer from 'puppeteer'

type Options = void | {
  headless?: boolean
}

const defaultFlags = [
  // Disabling the process sandbox makes it easier to run in Linux
  // environments
  '--no-sandbox',
  '--disable-setuid-sandbox',

  // Minimize disruption to/from user
  '--hide-scrollbars',
  '--mute-audio'
]

export default async function(options: Options): Promise<Browser> {
  let flags = defaultFlags
  if (!options || !('headless' in options) || options.headless) {
    flags = [...flags, '--headless']
  }

  const browser = await puppeteer.launch({
    // Setting `headless: true` causes `--disable-gpu` to be passed to Chrome.
    headless: false,
    args: flags
  })

  // Chrome defaults to opening a single blank tab
  const pages = await browser.pages()
  await pages[0].close()

  return { puppeteer: { browser } }
}