/* @flow */
import type { Browser, Page } from 'puppeteer-core'
import type { Tab } from 'puppet-strings'

export default function(browser: Browser, page: Page): Tab {
  const consoleMessages = []
  page.on('console', consoleMessage => {
    consoleMessages.push({
      type: consoleMessage.type(),
      message: consoleMessage.text()
    })
  })

  const errors = []
  page.on('pageerror', error => {
    errors.push(error.message)
  })

  return {
    puppeteer: { browser, page },
    console: consoleMessages,
    errors
  }
}
