/* @flow */
import type {
  Browser as PuppeteerBrowser,
  Page as PuppeteerPage
} from 'puppeteer-core'

export type Tab = {
  console: Array<{ type: string, message: string }>,
  errors: Array<string>,
  puppeteer: { browser: PuppeteerBrowser, page: PuppeteerPage },
  selenium?: empty
}
