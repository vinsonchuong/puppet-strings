/* @flow */
import type { Element } from 'puppet-strings'
import { branchOnTab, evalInTab } from 'puppet-strings'
import { By, until } from 'selenium-webdriver'
import cssToXPath from 'css-to-xpath'

export default branchOnTab({
  async puppeteer(tab, selector: string, text: ?string): Promise<Element> {
    const { puppeteer: { browser, page } } = tab
    const xpath = buildXPath(selector, text)

    try {
      const elementHandle = await page.waitForXPath(xpath, {
        visible: true,
        timeout: 5000
      })
      const metadata = await getElementMetadata(tab, elementHandle)
      return {
        ...metadata,
        puppeteer: { browser, page, elementHandle }
      }
    } catch (error) {
      throw new Error('Could not find element')
    }
  },

  async selenium(tab, selector: string, text: ?string): Promise<Element> {
    const { selenium: { webDriver } } = tab
    const xpath = buildXPath(selector, text)

    try {
      const webElement = await webDriver.wait(
        until.elementLocated(By.xpath(xpath)),
        5000
      )
      const metadata = await getElementMetadata(tab, webElement)
      return {
        ...metadata,
        selenium: { webDriver, webElement }
      }
    } catch (error) {
      throw new Error('Could not find element')
    }
  }
})

function buildXPath(selector, text) {
  return typeof text === 'string'
    ? cssToXPath
        .parse(selector)
        .where(cssToXPath.xPathBuilder.text().contains(text))
        .toXPath()
    : cssToXPath(selector)
}

function getElementMetadata(tab, element) {
  return evalInTab(
    tab,
    [element],
    `
    const [element] = arguments

    return {
      attributes: Array.from(element.attributes).reduce(
        (memo, attr) => Object.assign(memo, { [attr.name]: attr.value }),
        {}
      ),
      innerText: element.innerText,
      outerHTML: element.outerHTML
    }
    `
  )
}
