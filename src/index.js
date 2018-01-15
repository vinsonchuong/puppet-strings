/* @flow */
import type PuppeteerBrowser from 'puppeteer/lib/Browser'
import type PuppeteerPage from 'puppeteer/lib/Page'
// import type PuppeteerElementHandle from 'puppeteer/lib/ElementHandle'

export type Browser = {
  puppeteer: {
    browser: PuppeteerBrowser
  }
}

export type Tab = {
  puppeteer: {
    browser: PuppeteerBrowser,
    page: PuppeteerPage
  }
}

export { default as openBrowser } from './open-browser'
export { default as closeBrowser } from './close-browser'

export { default as openTab } from './open-tab'
export { default as closeTab } from './close-tab'
