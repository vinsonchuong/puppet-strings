/* @flow */
import type PuppeteerBrowser from 'puppeteer/lib/Browser'
import type PuppeteerPage from 'puppeteer/lib/Page'

export type Tab = {
  puppeteer: {
    browser: PuppeteerBrowser,
    page: PuppeteerPage
  },
  console: Array<{ type: string, message: string }>,
  errors: Array<string>
}
