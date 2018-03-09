/* @flow */
import type PuppeteerBrowser from 'puppeteer/lib/Browser'

export type Browser = {
  puppeteer: {
    browser: PuppeteerBrowser
  }
}
