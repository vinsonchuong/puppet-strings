/* @flow */
import type {
  Browser as PuppeteerBrowser,
  Page as PuppeteerPage,
  Frame as PuppeteerFrame,
  ElementHandle as PuppeteerElementHandle
} from 'puppeteer-core'

export type Element = {
  attributes: { [string]: string },
  innerText: string,
  outerHTML: string,
  puppeteer: {
    browser: PuppeteerBrowser,
    page: PuppeteerPage,
    frame: PuppeteerFrame,
    elementHandle: PuppeteerElementHandle<HTMLElement>
  },
  selenium?: empty
}
