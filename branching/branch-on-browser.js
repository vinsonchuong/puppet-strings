/* @flow */
import type { BrowserWithPuppeteer, BrowserWithSelenium } from 'puppet-strings'

export default function<Inputs: $ReadOnlyArray<mixed>, Output>(branches: {
  puppeteer?: (BrowserWithPuppeteer, ...Inputs) => Output,
  selenium?: (BrowserWithSelenium, ...Inputs) => Output
}): (BrowserWithPuppeteer | BrowserWithSelenium, ...Inputs) => Output {
  return (browser, ...inputs) => {
    if (browser.puppeteer && branches.puppeteer) {
      return branches.puppeteer(browser, ...inputs)
    } else if (browser.selenium && branches.selenium) {
      return branches.selenium(browser, ...inputs)
    } else {
      throw new Error('Unexpected Input')
    }
  }
}
