/* @flow */
import type { WebDriver } from 'selenium-webdriver'
import { Builder } from 'selenium-webdriver'
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox'

type Browser = {
  selenium: {
    browser: WebDriver
  }
}

type Options = {
  headless?: boolean
}

export default async function(options: Options = {}): Promise<Browser> {
  const firefoxOptions = new FirefoxOptions()

  if (!('headless' in options) || options.headless) {
    firefoxOptions.headless()
  }

  const browser = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(firefoxOptions)
    .build()

  return {
    selenium: { browser }
  }
}
