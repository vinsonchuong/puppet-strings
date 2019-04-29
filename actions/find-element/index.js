/* @flow */
import type { Tab, Element } from 'puppet-strings'
import { evalInTab } from 'puppet-strings'
import cssToXPath from 'css-to-xpath'

export default async function(
  tab: Tab,
  selector: string,
  text: ?string
): Promise<Element> {
  const {
    puppeteer: { browser, page }
  } = tab
  const xpath = buildXPath(selector, text)

  try {
    const elementHandle = await page.waitForXPath(xpath, {
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
}

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
