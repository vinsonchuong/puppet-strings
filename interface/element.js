/* @flow */
import type PuppeteerBrowser from 'puppeteer/lib/Browser'
import type PuppeteerPage from 'puppeteer/lib/Page'
import type PuppeteerElementHandle from 'puppeteer/lib/ElementHandle'
import type { WebDriver, WebElement } from 'selenium-webdriver'

export type ElementWithPuppeteer = {
  attributes: { [string]: string },
  innerText: string,
  outerHTML: string,
  puppeteer: {
    browser: PuppeteerBrowser,
    page: PuppeteerPage,
    elementHandle: PuppeteerElementHandle
  },
  selenium?: empty
}

export type ElementWithSelenium = {
  attributes: { [string]: string },
  innerText: string,
  outerHTML: string,
  puppeteer?: empty,
  selenium: { webDriver: WebDriver, webElement: WebElement }
}

export type Element = ElementWithPuppeteer | ElementWithSelenium
