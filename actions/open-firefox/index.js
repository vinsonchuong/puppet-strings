/* @flow */
import type { Browser } from 'puppet-strings'
import { Builder } from 'selenium-webdriver'
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox'

type Options = {
  headless?: boolean
}

export default async function(options: Options = {}): Promise<Browser> {
  const firefoxOptions = new FirefoxOptions()

  if (!('headless' in options) || options.headless) {
    firefoxOptions.headless()
  }

  const webDriver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(firefoxOptions)
    .build()

  return { selenium: { webDriver } }
}
