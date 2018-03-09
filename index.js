/* @flow */
import type PuppeteerBrowser from 'puppeteer/lib/Browser'
import type PuppeteerPage from 'puppeteer/lib/Page'
import type PuppeteerElementHandle from 'puppeteer/lib/ElementHandle'

export type Browser = {
  puppeteer: {
    browser: PuppeteerBrowser
  }
}

export type Tab = {
  puppeteer: {
    browser: PuppeteerBrowser,
    page: PuppeteerPage
  },
  console: Array<{ type: string, message: string }>,
  errors: Array<string>
}

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

export { default as openBrowser } from './actions/open-browser'
export { default as closeBrowser } from './actions/close-browser'

export { default as openTab } from './actions/open-tab'
export { default as closeTab } from './actions/close-tab'
export { default as evalInTab } from './actions/eval-in-tab'

export { default as findElement } from './actions/find-element'

export { default as clickElement } from './actions/click-element'
export { default as fillInElement } from './actions/fill-in-element'
