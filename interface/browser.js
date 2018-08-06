/* @flow */
import type { Browser as PuppeteerBrowser } from 'puppeteer'
import type { WebDriver } from 'selenium-webdriver'

export type BrowserWithPuppeteer = {
  puppeteer: { browser: PuppeteerBrowser },
  selenium?: empty
}

export type BrowserWithSelenium = {
  puppeteer?: empty,
  selenium: { webDriver: WebDriver }
}

export type Browser = BrowserWithPuppeteer | BrowserWithSelenium
