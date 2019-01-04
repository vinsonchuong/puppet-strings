/* @flow */
import type { BrowserWithSelenium } from 'puppet-strings'
import { Builder } from 'selenium-webdriver'
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox'

type Options = {
  headless?: boolean
}

export default async function(
  options: Options = {}
): Promise<BrowserWithSelenium> {
  const firefoxOptions = new FirefoxOptions()

  if (!('headless' in options) || options.headless) {
    firefoxOptions.headless()
  }

  const webDriver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(firefoxOptions)
    .build()

  const capabilities = await webDriver.getCapabilities()
  const pid = capabilities.get('moz:processID')

  function killFirefox() {
    try {
      process.kill(pid, 'SIGKILL')
    } catch (error) {}
  }

  process.once('exit', killFirefox)
  process.once('SIGINT', killFirefox)
  process.once('SIGTERM', killFirefox)
  process.once('SIGHUP', killFirefox)

  return { selenium: { webDriver } }
}
