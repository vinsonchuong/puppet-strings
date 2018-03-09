/* @flow */
import type PuppeteerBrowser from 'puppeteer/lib/Browser'
import type PuppeteerPage from 'puppeteer/lib/Page'
import type PuppeteerElementHandle from 'puppeteer/lib/ElementHandle'

export type Element = {
  attributes: { [string]: string },
  innerText: string,
  outerHTML: string,
  puppeteer: {
    browser: PuppeteerBrowser,
    page: PuppeteerPage,
    elementHandle: PuppeteerElementHandle
  }
}
