/* @flow */
import type PuppeteerBrowser from 'puppeteer/lib/Browser'
import type PuppeteerPage from 'puppeteer/lib/Page'
import type { WebDriver } from 'selenium-webdriver'

export type TabWithPuppeteer = {
  console: Array<{ type: string, message: string }>,
  errors: Array<string>,
  puppeteer: { browser: PuppeteerBrowser, page: PuppeteerPage },
  selenium?: empty
}

export type TabWithSelenium = {
  console: Array<{ type: string, message: string }>,
  errors: Array<string>,
  puppeteer?: empty,
  selenium: { webDriver: WebDriver }
}

export type Tab = TabWithPuppeteer | TabWithSelenium
