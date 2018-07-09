/* eslint-disable flowtype/no-weak-types */
/* @flow */
import type { TabWithPuppeteer, TabWithSelenium } from 'puppet-strings'

export default function<Inputs: any, Output>(branches: {
  puppeteer?: (TabWithPuppeteer, ...Inputs) => Output,
  selenium?: (TabWithSelenium, ...Inputs) => Output
}): (TabWithPuppeteer | TabWithSelenium, ...Inputs) => Output {
  return (tab, ...inputs) => {
    if (tab.puppeteer && branches.puppeteer) {
      return branches.puppeteer(tab, ...inputs)
    } else if (tab.selenium && branches.selenium) {
      return branches.selenium(tab, ...inputs)
    } else {
      throw new Error('Unexpected Input')
    }
  }
}
