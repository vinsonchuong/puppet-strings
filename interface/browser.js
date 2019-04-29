/* @flow */
import type { Browser as PuppeteerBrowser } from 'puppeteer-core'

export type Browser = {
  puppeteer: { browser: PuppeteerBrowser }
}
