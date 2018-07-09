/* eslint-disable flowtype/no-weak-types */
/* @flow */
import type { ElementWithPuppeteer, ElementWithSelenium } from 'puppet-strings'

export default function<Inputs: any, Output>(branches: {
  puppeteer?: (ElementWithPuppeteer, ...Inputs) => Output,
  selenium?: (ElementWithSelenium, ...Inputs) => Output
}): (ElementWithPuppeteer | ElementWithSelenium, ...Inputs) => Output {
  return (element, ...inputs) => {
    if (element.puppeteer && branches.puppeteer) {
      return branches.puppeteer(element, ...inputs)
    } else if (element.selenium && branches.selenium) {
      return branches.selenium(element, ...inputs)
    } else {
      throw new Error('Unexpected Input')
    }
  }
}
